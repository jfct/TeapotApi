const express       = require('express');
const router        = express.Router();
const controller    = require('../controllers/stockController')

router.put('/:ingredient', controller.put);
router.get('/', controller.getList);
router.get('/:ingredient', controller.get);
router.post('/:ingredient/add/:quantity', controller.add);
router.post('/:ingredient/remove/:quantity', controller.remove);
router.delete('/:ingredient', controller.delete);

module.exports = router;