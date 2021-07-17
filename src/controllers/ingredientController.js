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
            res.status(200).send({
                success : true,
                response: 'New Ingredient (' + ingredientName + ') created.'
            })
        }).catch((err) => {
            res.status(400).send({
                success : false,
                response: err.message
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
 * List a single ingredient
 */
exports.get = (req, res, next) => {
    try {
        Ingredient.findOne({'name' : req.params.ingredient}).then(function (ingredient) {
            res.status(200).send({
                success : true,
                response: ingredient
            });
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : true,
            response: err.message
        });
    }
}
/**
 * List the ingredients
 */
exports.getList = (req, res, next) => {
    try {
        Ingredient.list({}).then(function (list) {
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
 * Update ingredient unit
 */
exports.updateUnit = async (req, res, next) => {
    try {
        let ingredientName  = req.params.ingredient,
            newUnit         = req.body.unit,
            ingredientObj   = await Ingredient.load(ingredientName);

        ingredientObj.changeUnit(newUnit).then(() => {
            res.status(200).send({
                success : true,
                response: 'Unit changed!'
            });
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : true,
            response: err.message
        });
    }
}


/**
 * Remove an Ingredient
 */
exports.delete = (req, res, next) => {
    try {
        Ingredient.deleteOne({name: req.params.ingredient}).then(function (result) {
            res.status(200).send({
                success : true,
                response: result.deletedCount + ' deleted.'
            });
        })
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
};