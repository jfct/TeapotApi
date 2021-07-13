const Ingredient    = require('../model/ingredient');
const Stock         = require('../model/stock');

/**
 * Add an ingredient to stock
 */
 exports.put = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            body            = req.body;
            value           = body.value;

        // Check for duplicate before the rest of the process
        let ingredient = Ingredient.find({name: ingredientName});

        if(ingredient == null) {
            res.status(200).send("Ingredient doesn't exist.");
        }
        
        await Stock.addIngredient(ingredientName, value);
        res.status(200).send('Ingredient ' + ingredientName + '('+value+') added.');
    } catch(err) {
        res.status(400).send(err.message);
    }
}


/**
 * List a single ingredient in Stock
 */
exports.get = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient;
            stock           = await Stock.load();
            response        = await stock.getIngredient(ingredientName);

        if(response == null) {
            res.status(200).send('No ingredient (' + ingredientName + ') in stock.');
        } else {
            res.status(200).send(response);
        }
    
    } catch(err) {
        res.status(400).send(err.message);
    }
}
/**
 * List the ingredients in Stock
 */
exports.getList = (req, res, next) => {
    try {
        Stock.list({}).then(function (list) {
            res.status(200).send(list);
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}


/**
 * Adds quantity to an ingredient in the stock
 */
exports.add = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            value           = req.params.quantity,
            stock           = await Stock.load();
    
        let response = await stock.addQuantity(ingredientName, value)
        res.status(200).send('Added ' + value + ' of ' + ingredientName + ' to stock.')
    } catch (err) {
        res.status(400).send(err.message);
    }
}
/**
 * Removes quantity from an ingredient in the stock
 */
 exports.remove = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            value           = req.params.quantity,
            stock           = await Stock.load();
    
        let response = await stock.removeQuantity(ingredientName, value)
        res.status(200).send('Removed ' + value + ' of ' + ingredientName + ' to stock.')
    } catch (err) {
        res.status(400).send(err.message);
    }
}


/**
 * Remove an Ingredient
 */
exports.delete = async (req, res, next) => {
    try {
        let ingredient  = req.params.ingredient,
            stock       = await Stock.load();
        
        let response = await stock.removeIngredient(ingredient);
        res.status(200).send(req.params.ingredient + ' deleted.');
    } catch(err) {
        res.status(400).send(err.message);
    }
};