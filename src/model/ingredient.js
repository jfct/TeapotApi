const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const helper    = require('../helper');

/**
 * Ingredient schema
 */
const IngredientSchema = new Schema({
    name: {
        type    : String,
        required: true,
        unique  : true
    },
    // Measurement
    unit: {
        type    : String,
        required: true
    }
    
}, {collection: 'ingredients'})

/**
 * Methods
 */
IngredientSchema.methods = {
    /**
     * Change the ingredients unit of measurement
     * 
     * @param {String} newUnit 
     */
    changeUnit: function(newUnit) {
        try {
            if(typeof newUnit != "string") {
                throw new Error('The unit provided is not a string.')
            }

            this.unit = newUnit
            this.markModified('unit');
            return this.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    /**
     * Change the ingredients name
     * 
     * @param {String} newName
     */
    changeName: async function(newName) {
        try {
            if(typeof newName != "string") {
                throw new Error('The name provided is not a string.')
            }

            let obj = await this.find({"name" : newName});
            if(obj != null) {
                throw new Error('The name already exists');
            }

            this.name = newName
            this.markModified('name');
            return this.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    
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