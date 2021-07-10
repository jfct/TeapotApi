const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * Ingredient schema
 */
const IngredientSchema = new Schema({
    name: {
        type    : String,
        required: true,
        unique  : true
    },
    unit: {
        type    : String,
        required: true
    }
    
}, {collection: 'ingredients'})

/**
 * Methods
 */
IngredientSchema.methods = {
}

/**
 * Statics
 */
IngredientSchema.statics = {
    /**
     * Find ingredient by name
     * 
     * @param {String} name
     */
    load: function(name) {
        return this.findOne({name})
        .exec();
    },

    /**
     * List ingredients
     * 
     * @param {Object} options
     */
    list: function(options) {
        const   criteria    = (options.hasOwnProperty('criteria')? options.criteria : {}),
                limit       = (options.hasOwnProperty('limit')? options.limit : 30),
                page        = (options.hasOwnProperty('page')? options.page : 0),
                isLean      = (options.hasOwnProperty('lean')? options.lean : FALSE);
        try {
            return this.find(criteria)
            .sort({name: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .exec();
        } catch(err) {
            console.log(err);
            return 'error ocurred';
        }
    }
}

module.exports = mongoose.model('Ingredient', IngredientSchema)