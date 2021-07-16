const express       = require('express');
const router        = express.Router();
const controller    = require('../controllers/ingredientController')

router.put('/:ingredient', controller.put);
router.get('/', controller.getList);
router.get('/:ingredient', controller.get);
router.post('/:ingredient/unit', controller.updateUnit);
router.delete('/:ingredient', controller.delete);

module.exports = router;