let mongoose = require('mongoose')

let stockSchema = new mongoose.Schema({
    ingredients: [{
        ingredient: {
            type    : mongoose.Schema.Types.ObjectId, 
            ref     : 'Ingredient',
            required: true,
            unique  : true
        },
        quantity: {
            type    : Number,
            required: true
        }
    }] 
}, {collection: 'stock'});

module.exports = mongoose.model('Stock', stockSchema);