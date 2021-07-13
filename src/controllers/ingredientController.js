const Ingredient    = require('../model/ingredient');

/**
 * Create an ingredient
 */
 exports.put = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            body            = req.body;

        // Check for duplicate before the rest of the process
        Ingredient.find({name: ingredientName})
        
        let newIngredient = new Ingredient({
            name    : ingredientName,
            unit    : body.unit
        });

        newIngredient.save().then(() => {
            res.status(200).send('New Ingredient (' + ingredientName + ') created.')
        }).catch((err) => {
            res.status(400).send(err.message);
        });        
    } catch(err) {
        res.status(400).send(err.message);
    }
}


/**
 * List a single ingredient
 */
exports.get = (req, res, next) => {
    try {
        Ingredient.findOne({'name' : req.params.ingredient}).then(function (ingredient) {
            res.status(200).send(ingredient);
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}
/**
 * List the ingredients
 */
exports.getList = (req, res, next) => {
    try {
        Ingredient.list({}).then(function (list) {
            res.status(200).send(list);
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}



/**
 * Remove an Ingredient
 */
exports.delete = (req, res, next) => {
    try {
        Ingredient.deleteOne({name: req.params.ingredient}).then(function (response) {
            res.status(200).send(response.deletedCount + ' deleted.');
        })
    } catch(err) {
        res.status(400).send(err.message);
    }
};