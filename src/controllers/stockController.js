const Ingredient    = require('../model/ingredient');
const Stock         = require('../model/stock');

/**
 * Add an ingredient to stock
 */
 exports.put = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            body            = req.body;
            quantity        = body.quantity,
            stock           = await Stock.load();

        if(stock == null) {
            throw Error('No stock is currently initiated.');
        }

        // Check for duplicate before the rest of the process
        let ingredient = Ingredient.find({name: ingredientName});

        if(ingredient == null) {
            res.status(200).send({
                success : true,
                result  : "Ingredient doesn't exist."
            });
        }
        
        await stock.addIngredient(ingredientName, quantity);
        res.status(200).send('Ingredient ' + ingredientName + '('+quantity+') added.');
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : false,
            message : err.message
        });
    }
}


/**
 * List a single ingredient in Stock
 */
exports.get = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient;
            stock           = await Stock.load();
            result          = await stock.getIngredient(ingredientName);

        if(result == null) {
            res.status(200).send({
                success: true,
                response: 'No ingredient (' + ingredientName + ') in stock.'
            });
        } else {
            res.status(200).send({
                success : true,
                response: result
            });
        }
    
    } catch(err) {
        console.log(err)
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
}
/**
 * List the ingredients in Stock
 */
exports.getList = (req, res, next) => {
    try {
        Stock.list({}).then(function (list) {
            res.status(200).send({
                success : true,
                response: list
            });
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
}


/**
 * Adds quantity to an ingredient in the stock
 */
exports.add = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            stock           = await Stock.load();

        if(typeof req.body == 'object' && req.body.hasOwnProperty('quantity')) {
            let value = req.body.quantity;

            await stock.addQuantity(ingredientName, value)
    
            res.status(200).send({
                success : true,
                response: 'Added ' + value + ' of ' + ingredientName + ' to stock.'
            })
        } else {
            throw Error('The body from the request is invalid.');
        }

    } catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: err.message
        });
    }
}
/**
 * Removes quantity from an ingredient in the stock
 */
 exports.remove = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            stock           = await Stock.load();

        if(typeof req.body == 'object' && req.body.hasOwnProperty('quantity')) {
            let value = req.body.quantity;

            await stock.removeQuantity(ingredientName, value)
    
            res.status(200).send({
                success : true,
                response: 'Removed ' + value + ' of ' + ingredientName + ' to stock.'
            })
        } else {
            throw Error('The body from the request is invalid.');
        }    
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
}


/**
 * Remove an Ingredient
 */
exports.delete = async (req, res, next) => {
    try {
        let ingredient  = req.params.ingredient,
            stock       = await Stock.load();
        
        await stock.removeIngredient(ingredient);

        res.status(200).send({
            success : true,
            response: req.params.ingredient + ' deleted.'
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
};