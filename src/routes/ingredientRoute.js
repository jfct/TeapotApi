const express       = require('express');
const router        = express.Router();
const controller    = require('../controllers/ingredientController')

router.put('/:ingredient', controller.put);
router.get('/', controller.getList);
router.get('/:ingredient', controller.get);

//router.post('/:ingredient', controller.update);

router.delete('/:ingredient', controller.delete);

module.exports = router;