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
    settings: {}
}, {collection: 'beverages'})


/**
 * Methods
 */
BeverageSchema.methods = {
    /**
     * Update recipe 
     * 
     * @param {Object} newRecipe
     */
    updateRecipe: async function(newRecipe) {
        try {
            this.recipe.ingredients  = newRecipe;
            return this.save();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * Update a single recipe component 
     * 
     * @param {String} ingredient
     * @param {Number} value
     */
     updateRecipeComponent: async function(ingredient, value) {
        try {
            if(typeof ingredient !== 'string') {
                throw new Error('Component is not a string.');
            }

            for (let idx in this.recipe.ingredients) {
                if(this.recipe.ingredients[idx].ingredient.name == ingredient) {
                    this.recipe.ingredients[idx].quantity = value;
                }
            }
            return this.save();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * Updates the settings for a recipe
     * 
     * @param {Object} settings
     */
    updateSettings: async function(settings) {
        try {
            if(typeof this.settings !== 'object') {
                throw new Error('The settings provided is not an object.')
            }

            this.settings = settings;
            return this.save();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * Update a single setting 
     * 
     * @param {String} setting
     * @param {Number} value
     */
    updateSettingsComponent: async function(setting, value) {
        try {
            if(!this.settings.hasOwnProperty(setting)) {
                throw new Error('That setting is invalid.');
            }

            this.settings[setting] = value;

            // Have to mark as modified or the field wont update (Mixed type)
            this.markModified('settings');
            return this.save();
        } catch(err) {
            throw new Error(err);
        }
    }
}

/**
 * Statics
 */
BeverageSchema.statics = {
    /**
     * Find beverage by name
     * 
     * @param {String} name
     */
    load: function(name) {
        try {
            return this.findOne({name})
            .populate('beverageType')
            .populate('recipe.ingredients.ingredient')
            .exec();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * List beverages
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
            throw new Error(err);
        }
    }
}

const Beverage = mongoose.model('Beverage', BeverageSchema);
module.exports = Beverage;