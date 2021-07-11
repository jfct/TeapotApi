const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;

/**
 * Size schema
 */
const SizeSchema = new Schema({
    name: {
        type    : String,
        required: true,
        unique  : true
    }
}, {collection: 'sizes'});

/**
 * Methods
 */
SizeSchema.methods = {
    /**
     * Change the size name
     * 
     * @param {String} newName
     */
        changeName: async function(newName) {
        try {
            if(typeof newName != "string") {
                throw new Error('The name provided is not a string.')
            }

            let obj = await this.find({"name" : newName});
            if(obj != null) {
                throw new Error('The size already exists');
            }

            this.name = newName
            this.markModified('name');
            return this.save();
        } catch (err) {
            throw new Error(err);
        }
    }
}

/**
 * Statics
 */
SizeSchema.statics = {
    /**
     * Find beverage by name
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
     * List beverages
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
            throw new Error(err);
        }
    }
}

const Size = mongoose.model('Size', SizeSchema);
module.exports = Size;