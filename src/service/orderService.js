const mongoose      = require('mongoose');
const Size          = require('../model/size');
const Stock         = require('../model/stock');
const Ingredient    = require('../model/ingredient');
const Beverage      = require('../model/beverage');
const Order         = require('../model/order');
const helper        = require('../helper');


/**
 * Returns the sum of the ingredients
 * 
 * @param {Object} original object to keep
 * @param {Object} second object to add from
 * @returns 
 */
function addIngredientObjects(original, second) {
    for(let ing in second) {
        // Initialize the ingredient in the list if needed
        if (!original.hasOwnProperty(ing)) {
            original[ing] = second[ing];
        } else {
            original[ing] += second[ing];
        }
    }
    return original;
}


/**
 * Returns the total ingredients in a simple manner, adding from the current orders
 * 
 * @param {Object} necessaryIngredients 
 * @returns necessaryIngredients
 */
async function AddOrdersIngredients() {
    try {
        let necessaryIngredients = {};

        orders = await Order.list({
            'criteria': {
                'status.active': true 
            },
            'isLean': true
        });
        
        for(let idx in orders) {
            // Add the beverage ingredients to the list
            ingredients             = await AddBeverageIngredients(orders[idx].beverage.name, orders[idx].size.multiplier);
            necessaryIngredients    = addIngredientObjects(necessaryIngredients, ingredients);
            // Add the extra ingredients from those orders as well
            ingredients             = await AddExtraIngredients(orders[idx].extraIngredients);
            necessaryIngredients    = addIngredientObjects(necessaryIngredients, ingredients);
        }
        
        return necessaryIngredients;
    } catch(err) {
        throw err;
    }
}
    

/**
 * 
 * Returns the total ingredients in a simple manner, adding from the extra ingredients
 * 
 * @param {Object} necessaryIngredients 
 * @param {Object} extraIngredients
 * @returns necessaryIngredients
 */
async function AddExtraIngredients(extraIngredients) {
    try {
        let necessaryIngredients = {};

        // If it's an array
        if(Array.isArray(extraIngredients)) {
            for(let idx in extraIngredients) {
                // Check if ingredient is valid
                let ingredient = await Ingredient.load(extraIngredients[idx].ingredient.name);
    
                if (ingredient != null) {
                    let name        = extraIngredients[idx].ingredient.name,
                        quantity    = extraIngredients[idx].quantity;

                        if(!necessaryIngredients.hasOwnProperty(name)) {
                            necessaryIngredients[name] = quantity;
                        } else {
                            necessaryIngredients[name] += quantity;
                        }
                } else {
                    throw new Error("The ingredient(" + extraIngredients[idx].ingredient.name + ") you requested doesn't exist.");
                }
            }
        } else {
            throw new Error('Invalid type of data received for the extraIngredients.');
        }
        return necessaryIngredients;
    } catch (err) {
        throw err;
    }
}


/**
 * Returns the total ingredients in a simple manner, adding to it the beverage sent
 * 
 * @param {Object} necessaryIngredients 
 * @param {String} beverage 
 * @param {Number} multiplier
 * @returns necessaryIngredients
 */
async function AddBeverageIngredients(beverageName, multiplier) {
    try {
        var necessaryIngredients = {};

        if(typeof beverageName !== "string") {
            throw new Error('Invalid beverage parameter received.')
        }
        if(!helper.isNumeric(multiplier)) {
            throw new Error('Invalid multiplier received.')
        }

        // Check if beverage is valid
        let beverage = await new Beverage.load(beverageName);
        if(beverage == null) {
            throw new Error("The beverage doesn't exist.");
        }

        // Get the ingredients from the beverage
        ingredientList  = await beverage.getIngredientList();


        // Add them to the array
        for(let ingredient in ingredientList) {
            necessaryIngredients[ingredient] = (ingredientList[ingredient] * multiplier);
        }
        
        return necessaryIngredients;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    /**
     * Closes an order and removes the ingredients from the stock
     * @param {String} id 
     */
    complete: async function(id) {
        try {
            let session = await mongoose.startSession(),
                stock   = await Stock.load(),
                order   = await Order.load(id),
                beverage,
                ingredientMultiplier,
                result;

            if(stock == null) {
                throw new Error('No stock is available.');
            }
            if(order == null) {
                throw new Error("The order with id ("+id+") doesn't exist.");
            }
            ingredientMultiplier    = order.size.multiplier;
            beverage                = await Beverage.load(order.beverage.name);

            await session.withTransaction(async ()=> {
                // Remove the extra ingredients
                for(let idx in order.extraIngredients) {
                    let name        = order.extraIngredients[idx].ingredient.name,
                        quantity    = order.extraIngredients[idx].quantity,
                        ingredientObj;
    
                    ingredientObj = await Ingredient.load(name);
                    if(ingredientObj == null) { 
                        throw new Error('Invalid ingredient.');
                    }

                    await stock.removeQuantity(name, quantity);
                }

                // Remove the beverage ingredients
                for(let idx in beverage.recipe.ingredients) {
                    let name        = beverage.recipe.ingredients[idx].ingredient.name,
                        quantity    = beverage.recipe.ingredients[idx].quantity,
                        ingredientObj;
    
                    ingredientObj = await Ingredient.load(name);
                    if(ingredientObj == null) { 
                        throw new Error('Invalid ingredient.');
                    }

                    await stock.removeQuantity(name, quantity * ingredientMultiplier);
                }

                // Complete the order
                result = await order.complete();
            });
            session.endSession();

            return result;
        } catch (err) {
            throw err;
        }
    },


    /**
     * Returns the possibility to brew the specified type of drink or not
     * 
     * @param {String} beverageType 
     * @returns {Boolean}
     */
    verifyPossibiltiyBrew: async function(beverageType) {
        // TODO:
        return false;
        
    },

    /**
     * Checks if there's enough stock for a new order and its extraIngredients
     * 
     * Returns a valid boolean field and 3 additional objects necessary to create a new order
     * 
     * @param {String} beverageName Beverage name
     * @param {Object} extraIngredients Simple object where each object is an ingredient
     * @param {String} size Size name
     * @returns {Object} [valid][beverage][extraIngredients][size]
     */
    verifyStockforNewOrderIngredients: async function(beverageName, extraIngredients, size) {
        try {
            let extraIngredientsObj     = [],
                necessaryIngredients    = {},
                ingredients,
                beverageObj,
                sizeTypeObj,
                ingredientMultiplier;

            // Check if beverage exists
            beverageObj = await Beverage.load(beverageName);

            if(beverageObj == null) {
                throw new Error("The beverage you requested doesn't exist.");
            }
            // Check for duplicate before the rest of the process
            sizeTypeObj = await Size.load(size);
            if(sizeTypeObj == null) {
                throw new Error("The size you requested doesn't exist.");
            }
            ingredientMultiplier    = sizeTypeObj.multiplier;

            // Verify the extraIngredients obj
            for(let idx in extraIngredients) {
                // Verify the ingredient
                let ingredientObj = await Ingredient.load(extraIngredients[idx].name);

                if(ingredientObj == null) {
                    throw new Error("The ingredient (" + extraIngredients[idx].name + ") in extraIngredients doesn't exist.");
                } else {
                    // Creates the object for the AddExtraIngredients function
                    extraIngredientsObj.push({
                        ingredient: ingredientObj,
                        quantity: extraIngredients[idx].quantity
                    });
                }
            }

            // Check all of the ingredients necessary to complete every order
            // 1) Active orders + 2) extra ingredients +  3) current order ingredients
            // Scan all the active orders, add the extra ingredients from those order and then add the current orders
            // in the end verify if the ingredients are enough

            // Add the multiplier to thee ingredients, but not to the extraIngredients (seperate part from recipe)
            // 1. Check current orders ingredients needed
            ingredients             = await AddOrdersIngredients();
            necessaryIngredients    = addIngredientObjects(necessaryIngredients, ingredients);
            // 2. Check the new order recipe
            ingredients             = await AddBeverageIngredients(beverageObj.name, ingredientMultiplier);
            necessaryIngredients    = addIngredientObjects(necessaryIngredients, ingredients);
            // 3. Add the extraIngredients from the new recipe
            ingredients             = await AddExtraIngredients(extraIngredientsObj);
            necessaryIngredients    = addIngredientObjects(necessaryIngredients, ingredients);

            // Check stock total ingredients
            let stock           = await Stock.load();
            if(stock == null) {
                throw new Error("No stock is not loaded yet.");
            }

            let stockList = await stock.getIngredientList();

            // Verify the reserved ingredients with the current stock
            for(let ingredient in necessaryIngredients) {
                if (!stockList.hasOwnProperty(ingredient)) {
                    throw new Error("The stock doesn't have the ingredient (" + ingredient + ") you need.");
                }
                let value = necessaryIngredients[ingredient];

                // Verify if there's enough quantity of an ingredient
                if(stockList[ingredient] - value  < 0) {
                    throw new Error("The stock doesn't have enough of ingredient (" + ingredient + ").");
                }
            }
            
            return {
                'valid'             : true,
                'beverage'          : beverageObj,
                'size'              : sizeTypeObj,
                'extraIngredients'  : extraIngredientsObj
            };
        } catch(err) {
            throw err;
        }
    }
}