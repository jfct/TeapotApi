const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * Orders schema
 */
const OrderSchema = new Schema({
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

/**
 * Methods
 */
OrderSchema.methods = {
    /**
     * Closes the order, changes the status and adds the completion date
     */
    closeOrder: function() {
        try {
            this.status.completed   = TRUE;
            this.status.completedAt = new Date();
            this.markModified('status');
            this.save();
        } catch (err) {
            throw new Error(err);
        }
    }
}

/**
 * Statics
 */
OrderSchema.statics = {
    /**
     * Load order by id
     * 
     * @param {String} name
     */
    load: function(name) {
        try {
            return this.findOne({name})
            .populate('extraIngredients.ingredient')
            .populate('size')
            .populate('beverage')
            .exec();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * List orders
     * 
     * @param {Object} options
     */
    list: function(options) {
        const   criteria    = (options.hasOwnProperty('criteria')? options.criteria : {}),
                limit       = (options.hasOwnProperty('limit')? options.limit : 30),
                page        = (options.hasOwnProperty('page')? options.page : 0),
                isLean      = (options.hasOwnProperty('lean')? options.lean : false);
        try {
            return this.find(criteria)
            .sort({name: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .populate('extraIngredients.ingredient')
            .populate('size')
            .populate('beverage')
            .exec();
        } catch(err) {
            throw new Error(err);
        }
    }
}

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;