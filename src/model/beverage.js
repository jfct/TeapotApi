const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * Beverage schema
 */
const BeverageSchema = new Schema({
    name: {
        type    : String,
        required: true,
        unique  : true
    },
    beverageType: {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'BeverageType',
        required: true
    },
    recipe: {
        ingredients: [{
            ingredient: {
                type    : mongoose.Schema.Types.ObjectId, 
                ref     : 'Ingredient',
                required: true
            },
            quantity: {
                type    : Number,
                required: true
            }
        }]
    },
}, {collection: 'beverages'})

/**
 * Methods
 */
BeverageSchema.methods = {

}

/**
 * Statics
 */
BeverageSchema.statics = {

}

module.exports = mongoose.model('Beverage', BeverageSchema);