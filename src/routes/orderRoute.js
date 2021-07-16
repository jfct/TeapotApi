const express       = require('express');
const router        = express.Router();
const controller    = require('../controllers/orderController')

router.put('/:beverage', controller.put);
router.get('/:id', controller.getSingle);
router.get('/', controller.getList);
router.get('/past', controller.getPast);
router.post('/:id/complete', controller.complete);
router.post('/:id/cancel', controller.cancel);

module.exports = router;