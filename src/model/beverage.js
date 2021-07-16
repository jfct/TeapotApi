const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * Beverage schema
 */
const BeverageSchema = new Schema({
    name: {
        type        : String,
        required    : true,
        lowercase   : true,
        trim        : true,
        unique      : true
    },
    description: String,
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
     * Return the list of ingredients in a simple key->value manner
     */
    getIngredientList: async function() {
        try {
            let ingredientList = {};

            for(let idx in this.recipe.ingredients) {
                let ingredient  = this.recipe.ingredients[idx].ingredient.name,
                    quantity    = this.recipe.ingredients[idx].quantity;

                ingredientList[ingredient] = quantity;
            }
            return ingredientList;
        } catch (err) {
            throw err;
        }
    },

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
            throw err;
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
            throw err;
        }
    },

    /**
     * Updates the settings for a recipe
     * 
     * @param {Object} settings
     */
    updateSettings: async function(settings) {
        try {
            if(typeof settings !== 'object') {
                throw new Error('The settings provided is not an object.')
            }

            this.settings = settings;
            return this.save();
        } catch(err) {
            throw err;
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
            throw err;
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
            if(typeof name !== "string") {
                throw new Error('Invalid name given');
            }

            return Beverage.findOne({'name': name.toLowerCase()})
            .populate('beverageType')
            .populate('recipe.ingredients.ingredient')
            .exec();
        } catch(err) {
            throw err;
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
                isLean      = (options.hasOwnProperty('lean')? options.lean : false);
        try {
            return Beverage.find(criteria)
            .sort({name: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .populate('beverageType')
            .populate('recipe.ingredients.ingredient')
            .exec();
        } catch(err) {
            throw err;
        }
    }
}

const Beverage = mongoose.model('Beverage', BeverageSchema);
module.exports = Beverage;