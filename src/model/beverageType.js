const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * BeverageType scheme
 */
 const BeverageTypeSchema = new Schema({
    name: {
        type    : String,
        required: true,
        unique  : true
    }
}, {collection: 'beverageTypes'})


/**
 * Methods
 */
BeverageTypeSchema.methods = {
    /**
     * Change the bevera type name
     * 
     * @param {String} newName 
     */
    changeName: function(newName) {
        try {
            if(typeof newName != "string") {
                throw new Error('The unit provided is not a string.')
            }

            this.name = newName
            this.markModified('unit');
            return this.save();
        } catch (err) {
            throw new Error(err);
        }
    }
}

/**
 * Statics
 */
BeverageTypeSchema.statics = {
    /**
     * Find beverage type by name
     * 
     * @param {String} name
     */
    load: function(name) {
        try {
            return this.findOne({name})
            .exec();
        } catch(err) {
            throw new Error(err);
        }
    },

    /**
     * List beverage types
     * 
     * @param {Object} options
     */
    list: function(options) {
        const   criteria    = (options.hasOwnProperty('criteria')? options.criteria : {}),
                limit       = (options.hasOwnProperty('limit')? options.limit : 30),
                page        = (options.hasOwnProperty('page')? options.page : 0),
                isLean      = (options.hasOwnProperty('lean')? options.lean : FALSE);
        try {
            return this.find(criteria)
            .sort({name: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .exec();
        } catch(err) {
            return 'error ocurred';
        }
    }
}

module.exports = mongoose.model('BeverageType', BeverageTypeSchema);