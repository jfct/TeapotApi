const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;
const helper    = ('../helper');

/**
 * Size schema
 */
const SizeSchema = new Schema({
    name: {
        type        : String,
        required    : true,
        unique      : true,
        lowercase   : true,
        trim        : true,
    },
    multiplier: {
        type    : Number,
        required: true,
        // Integer only
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 1
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
            throw err;
        }
    },

    /**
     * Change the multiplier of the drink
     * 
     * @param {Number} multiplier
     */
     changeMultiplier: async function(multiplier) {
        try {
            if(helper.isNumeric(multiplier)) {
                throw new Error('The multiplier provided is not a number.')
            }

            this.multiplier = multiplier
            this.markModified('multiplier');
            return this.save();
        } catch (err) {
            throw err;
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
            if(typeof name !== "string") {
                throw new Error('Invalid name given');
            }

            return Size.findOne({'name': name}).exec();
        } catch(err) {
            throw err;
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
                isLean      = (options.hasOwnProperty('lean')? options.lean : false);
        try {
            return Size.find(criteria)
            .sort({name: 1})
            .limit(limit)
            .skip(limit * page)
            .lean(isLean)
            .exec();
        } catch(err) {
            throw err;
        }
    }
}

const Size = mongoose.model('Size', SizeSchema);
module.exports = Size;