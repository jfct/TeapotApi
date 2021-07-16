const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * Orders schema
 */
const OrderSchema = new Schema({
    user: {
        type    : String,
        required: true
    },
    beverage: {
        type    : mongoose.ObjectId,
        ref     : 'Beverage',
        required: true
    },
    extraIngredients: [{
        ingredient: {
            type    : mongoose.Schema.Types.ObjectId, 
            ref     : 'Ingredient',
            required: true
        },
        quantity: {
            type    : Number,
            required: true
        }
    }],
    size: {
        type: mongoose.ObjectId,
        ref: 'Size',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        active: {
            type: Boolean,
            default: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Date,
            default: null
        }
    },
} , {collection: 'orders'});

/**
 * Methods
 */
OrderSchema.methods = {
    /**
     * Closes the order, changes the status and adds the completion date
     */
    complete: async function() {
        try {
            this.status.completed   = true;
            this.status.active      = false;
            this.status.completedAt = new Date();
            this.markModified('status');
            return this.save();
        } catch (err) {
            throw err;
        }
    },


    /**
     * Cancels a specific order
     * 
     * @param {String} id 
     */
    cancel: function(id) {
        try {
            this.status.completed   = true;
            this.status.completedAt = new Date();
            this.markModified('status');
            return this.save();
        } catch (err) {
            throw err;
        }
    }
}

/**
 * Statics
 */
OrderSchema.statics = {
    /**
     * Load order by id
     * 
     * @param {String} _id
     */
    load: function(_id) {
        try {
            return Order.findOne({_id})
            .populate('extraIngredients.ingredient')
            .populate('size')
            .populate('beverage')
            .exec();
        } catch(err) {
            throw err;
        }
    },

    /**
     * List orders
     * 
     * @param {Object} options
     */
    list: function(options) {
        const   criteria    = (options.hasOwnProperty('criteria')? options.criteria : {}),
                limit       = (options.hasOwnProperty('limit')? options.limit : 30),
                page        = (options.hasOwnProperty('page')? options.page : 0),
                isLean      = (options.hasOwnProperty('lean')? options.lean : false);
        try {
            return Order.find(criteria)
            .sort({name: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .populate('extraIngredients.ingredient')
            .populate('size')
            .populate({
                path        : 'beverage',
                populate    : {
                    path    : 'beverageType',
                },
                populate    : {
                    path    : 'recipe.ingredients.ingredient',
                }
            })
            .exec();
        } catch(err) {
            throw err;
        }
    },

    /**
     * List orders
     * 
     * @param {Object} options
     */
     simplifiedList: function(options) {
        const   criteria    = (options.hasOwnProperty('criteria')? options.criteria : {}),
                limit       = (options.hasOwnProperty('limit')? options.limit : 30),
                page        = (options.hasOwnProperty('page')? options.page : 0),
                isLean      = (options.hasOwnProperty('lean')? options.lean : false);
        try {
            return Order.find(criteria)
            .sort({created: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .populate('extraIngredients.ingredient', 'name unit')
            .populate('size', 'name multiplier')
            .populate({
                path    : 'beverage',
                select  : 'name',
                populate : {
                    path    : 'beverageType',
                    select  : 'name'
                },
                populate : {
                    path    : 'recipe.ingredients.ingredient',
                    select  : 'name quantity'
                },
            })
            .select('_id user created extraIngredients.quantity beverage')
            .exec();
        } catch(err) {
            throw err;
        }
    },


}

const Order     = mongoose.model('Order', OrderSchema);
module.exports  = Order;