const Beverage      = require('../model/beverage');
const BeverageType  = require('../model/beverageType');
const Ingredient    = require('../model/ingredient');

/**
 * Create a beverage
 */
 exports.put = async (req, res, next) => {
    try {
        let recipeName  = req.params.beverage,
            body        = req.body,
            reqType     = await BeverageType.load(body.beverageType),
            reqSettings = body.settings || {},
            reqRecipe   = body.recipe || [],
            finalRecipe = [];

        // Check for duplicate before the rest of the process
        Beverage.find({name: recipeName})
        
        // Fill the recipe with the ingredients 
        for(idx in reqRecipe) {
            if(!reqRecipe[idx].hasOwnProperty('name') || !reqRecipe[idx].hasOwnProperty('quantity')) {
                throw Error('Invalid recipe format.');
            }

            let ingredientName  = reqRecipe[idx].name,
                ing             = await Ingredient.load(ingredientName);

            if(ing != null) {
                finalRecipe.push({
                    ingredient  : ing._id,
                    quantity    : reqRecipe[idx].quantity
                });
            } else {
                throw Error("This ingredient (" + reqRecipe[idx].name + ") doesn't exist.");
            }
        }

        let newBeverage = new Beverage({
            name		: recipeName,
            beverageType: reqType._id,
            recipe		: { ingredients: finalRecipe },
            settings    : reqSettings
        });

        newBeverage.save(function(err) {
            res.status(200).send('New beverage ('+recipeName+') created.')
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}


/**
 * List a single beverage
 */
exports.get = (req, res, next) => {
    try {
        Beverage.findOne({'name' : req.params.beverage}).then(function (beverage) {
            res.status(200).send(beverage);
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}
/**
 * List the beverages
 */
exports.getList = (req, res, next) => {
    try {
        Beverage.list({}).then(function (list) {
            res.status(200).send(list);
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}
/**
 * List the recipe from a specific beverage
 */
exports.getRecipe = (req, res, next) => {
    try {
        Beverage.load(req.params.beverage).then(function (beverage) {
            console.log(beverage.recipe);
            res.status(200).send(beverage.recipe);
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
}


/**
 * Change the whole settings from a beverage
 */
exports.postChangeSettings = async(req,res,next) => {
    try {
        let body = req.body;

        if (typeof body == 'object' && body.hasOwnProperty('settings')) {
            let beverage = await Beverage.load(req.params.beverage);
            if (beverage != null) {
                await beverage.updateSettings(body.settings);
                res.status(200).send('Settings updated for "' + beverage.name + '"');
            } else {
                res.status(200).send('That beverage was not found.')
            }
        } else {
            res.status(400).send('The body received is invalid.')
        }
    } catch(err) {
        res.status(400).send(err.message)
    }
}
/**
 * Change a single component from settings
 */
exports.postChangeSettingComponent = async (req,res,next) => {
    try {
        let body    = req.body,
            value   = body.value,
            setting = req.params.setting;

        if (typeof body == 'object' && body.hasOwnProperty('value')) {
            let beverage = await Beverage.load(req.params.beverage);
            if (beverage != null) {
                await beverage.updateSettingsComponent(setting, value);
                res.status(200).send('Settings updated for "' + beverage.name + '" setting "' + setting + '".');
            } else {
                res.status(200).send('That beverage was not found.')
            }
        } else {
            res.status(400).send('The body received is invalid.')
        }
    } catch(err) {
        res.status(400).send(err.message)
    }
}


/**
 * Change recipe
 */
exports.postChangeRecipe = async (req,res,next) => {
    try {
        let body = req.body;

        if (typeof body == 'object' && body.hasOwnProperty('settings')) {
            let beverage = await Beverage.load(req.params.beverage);
            if (beverage != null) {
                await beverage.updateRecipe(body.recipe);
                res.status(200).send('Recipe updated for "' + beverage.name + '"');
            } else {
                res.status(200).send('That beverage was not found.')
            }
        } else {
            res.status(400).send('The body received is invalid.')
        }
    } catch(err) {
        res.status(400).send(err.message)
    }
}

/**
 * Change a single component from the recipe
 */
exports.postChangeRecipeComponent = async (req,res,next) => {
    try {
        let body        = req.body,
            value       = body.value,
            ingredient  = req.params.ingredient;

        if (typeof body == 'object' && body.hasOwnProperty('value')) {
            let beverage = await Beverage.load(req.params.beverage);
            if (beverage != null) {
                let resp = await beverage.updateRecipeComponent(ingredient, value);
                console.log(resp);
                res.status(200).send('Recipe updated for "' + beverage.name + '" ingredient "' + ingredient + '".');
            } else {
                res.status(200).send('That beverage was not found.')
            }
        } else {
            res.status(400).send('The body received is invalid.')
        }
    } catch(err) {
        res.status(400).send(err.message)
    }
}


/**
 * Remove a beverage
 */
exports.delete = (req, res, next) => {
    try {
        console.log(req.params.beverage);
        Beverage.deleteOne({name: req.params.beverage}).then(function (response) {
            res.status(200).send(response.deletedCount + ' deleted.');
        })
    } catch(err) {
        res.status(400).send(err.message);
    }
};