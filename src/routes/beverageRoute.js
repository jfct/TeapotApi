const express       = require('express');
const router        = express.Router();
const controller    = require('../controllers/beverageController')

router.put('/:beverage', controller.put);
router.get('/', controller.getList);
router.get('/:beverage', controller.get);
router.get('/:beverage/recipe', controller.getRecipe);
router.delete('/:beverage', controller.delete);
// Settings
router.post('/:beverage/settings', controller.postChangeSettings);
router.post('/:beverage/settings/:setting', controller.postChangeSettingComponent);
// Recipe
router.post('/:beverage/recipe', controller.postChangeRecipe);
router.post('/:beverage/recipe/:ingredient', controller.postChangeRecipeComponent);

module.exports = router;