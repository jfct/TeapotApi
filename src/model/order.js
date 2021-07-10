let mongoose = require('mongoose')

/**
 * Types of size
 */
let sizeSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    }
}, {collection: 'sizes'});


/**
 * Orders schema
 */
let orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    beverage: {
        type: mongoose.ObjectId,
        ref: 'beverage',
        required: true
    },
    extraIngredients: [{
        ingredient: {
            type    : mongoose.Schema.Types.ObjectId, 
            ref     : 'Ingredient',
            required: true
        },
        quantity: {
            type    : Number,
            required: true
        }
    }],
    size: {
        type: sizeSchema,
        ref: 'size',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        completed: {
            type: Boolean,
            default: FALSE
        },
        completedAt: {
            type: Date,
            default: FALSE
        }
    },
} , {collection: 'orders'});

const Size = mongoose.model('Size', sizeSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Size,
    Order
}