const mongoose      = require('mongoose')
const Schema        = mongoose.Schema;
const Ingredient    = require('./ingredient');
const helper        = require('../helper');

const StockSchema = new Schema({
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
}, {collection: 'stock'})


/**
 * Methods
 */
StockSchema.methods = {
    /**
     * Adds quantity to an ingredient in the stock
     * 
     * @param {String} ingredient 
     * @param {Number} value 
     */
    addQuantity: async function(ingredient, value) {
        try {
            let ingredientObj = await Ingredient.load(ingredient);
    
            // If it doesnt exist
            if (ingredientObj == null) {
                throw new Error("The ingredient doesn't exist in the current stock.")
            } else {
                // If it exists, then add to the current stockpile
                for (let idx in this.ingredients) {
                    if(this.ingredients[idx].ingredient.name == ingredientObj.name) {
                        this.ingredients[idx].quantity += value;
                    }
                }
            }

            this.markModified('ingredients');
            return this.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    /**
     * Removes quantity from an ingredient in the stock
     * 
     * @param {String} ingredient 
     * @param {Number} value 
     */
    removeQuantity: async function(ingredient, value) {
        try {
            if(!helper.isNumeric(value)) {
                throw new Error('The value is not valid.');
            }

            let ingredientObj = await Ingredient.load(ingredient);

            // If it doesnt exist
            if (ingredientObj == null) {
                throw new Error("The ingredient doesn't exist in the current stock.");
            } else {
                // If it exists, then add to the current stockpile
                for (let idx in this.ingredients) {
                    if(this.ingredients[idx].ingredient.name == ingredientObj.name) {
                        if (this.ingredients[idx].quantity - value < 0) {
                            throw new Error('The quantity you want to remove is higher than the current stock.');
                        }
                        this.ingredients[idx].quantity -= value;
                    }
                }
            }

            this.markModified('ingredients');
            return this.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    /**
     * Add a new ingredient to the stock
     * 
     * TODO: Add response
     * 
     * @param {Number} value 
     */
    addIngredient: async function(ingredient, value) {
        try {
            let ingredientObj = await Ingredient.load(ingredient);

            // If it doesnt exist
            if (ingredientObj == null) {
                throw new Error("The ingredient doesn't exist.");
            } else {
                // Check if it exists in stock
                // We have to use the ID, because it only loads the remaining objects after the populate
                let obj     = await Stock.find({"ingredients.ingredient" : ingredientObj._id}).populate('ingredients.ingredient');
                
                // If it's not in the stock, add
                if(Object.keys(obj).length < 1) {
                    this.ingredients.push({
                        ingredient  : ingredientObj._id,
                        quantity    : value
                    });
                    return this.save();
                } else {
                    return this.addQuantity(ingredient, value);
                }
            }
        } catch(err) {
            throw new Error(err);
        }
    },
    
    /**
     * Completly remove the ingredient from the stock
     * 
     * TODO: Add response
     * @param {Number} value 
     */
    removeIngredient: async function(ingredient) {
        try {
            let ingredientObj = await Ingredient.load(ingredient);

            // If there are no ingredients of this type in stock already
            if(ingredientObj == null) {
                return 1;
            } else {
                // If the ingredient is part of the stock, then remove it
                let res = await Stock.updateOne({'ingredients.ingredient': ingredientObj._id}, { "$pull": { "ingredients": { "ingredient": ingredientObj._id } }}, { safe: true, multi:true });
                return this.save();
            }
        } catch(err) {
            throw new Error(err);
        }
    }

}

/**
 * Statics
 */
StockSchema.statics = {
    /**
     * Load the current stock
     * 
     * @param {String} name
     */
    load: function() {
        try {
            return this.findOne()
            .populate('ingredients.ingredient')
            .exec();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * List stock
     * 
     * @param {Object} options
     */
    list: function(options) {
        const   isLean      = (options.hasOwnProperty('lean')? options.lean : FALSE);
        try {
            return this.find()
            .lean(isLean)
            .exec();
        } catch(err) {
            throw new Error(err);
        }
    }
}


const Stock = mongoose.model('Stock', StockSchema);
module.exports = Stock;