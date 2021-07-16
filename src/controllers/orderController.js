const mongoose      = require('mongoose');
const Order         = require('../model/order');
const OrderService  = require('../service/orderService');
const BeverageService  = require('../service/beverageService');
const helper        = require('../helper');
const beverageService = require('../service/beverageService');

/**
 * Place a new order
 */
 exports.put = async (req, res, next) => {
    try {
        let beverageName        = req.params.beverage,
            body                = req.body,
            size                = body.size,
            user                = body.user,
            extraIngredients    = body.extraIngredients,
            response,
            order;

        // Verify if it's brewable
        await BeverageService.verifyBeverageIsBrewable(beverageName);

        // Check if they can brew that type of beverage TODO:
        response = await OrderService.verifyStockforNewOrderIngredients(beverageName, extraIngredients, size)

        // Create the new order
        order = new Order({
            user            : user,
            beverage        : response.beverage._id,
            extraIngredients: response.extraIngredients,
            size            : response.size._id,
            created         : helper.currentDate(),
            status          : {
                completed   : false,
                completedAt : null
            }
        });

        order.save().then(() => {
            res.status(200).send({
                success: true,
                response: 'Order for ' + beverageName + ' queued!'
            });
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
 * List all the active orders
 * Shows a simplified list of orders
 */
exports.getList = async (req, res, next) => {
    try {
        let list = await Order.simplifiedList({
            'criteria': {
                "status.active": true
            },
            'isLean': true
        });
        res.status(200).send({
            success : true,
            response: list
        });
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response:err.message
        });
    }
}
/**
 * List the ingredients in Stock
 * Shows a simplified list of orders
 */
exports.getPast = async (req, res, next) => {
    try {
        let list = await Order.simplifiedList({
            'criteria': {
                'status.completed': true
            },
            'isLean': true
        });
        res.status(200).send({
            success : true,
            response: list
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
 * Shows a single order by id
 * Shows the complete info
 */
 exports.getSingle = async (req, res, next) => {
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            let list = await Order.list({
                'criteria': {
                    '_id' : req.params.id,
                },
                'isLean': true
            });
            res.status(200).send({
                success : true,
                response: list
            });
        } else {
            throw new Error('Invalid order Id.');
        }
    } catch(err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
}


/**
 * Completes an order
 */
exports.complete = async (req, res, next) => {
    try {
        let orderId     = req.params.id;
        
        await OrderService.complete(orderId);
        res.status(200).send({
            success : true,
            response: 'Order '+orderId+' closed.'
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
}
/**
 * Cancels an order
 */
 exports.cancel = async (req, res, next) => {
    try {
        let orderId     = req.params.id,
            order       = await Order.load(orderId);

        if(order == null) {
            res.status(200).send({
                success : true,
                response: "The order id doesn't exist."
            });
        }

        order.cancel().then(() => {
            res.status(200).send({
                success : true,
                response: 'Order cancelled!'
            });
        }).catch((err) => {
            res.status(400).send({
                success : false, 
                response: err.message
            });
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success : false,
            response: err.message
        });
    }
}
