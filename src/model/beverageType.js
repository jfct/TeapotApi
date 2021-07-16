const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

/**
 * BeverageType scheme
 */
 const BeverageTypeSchema = new Schema({
    name: {
        type        : String,
        lowercase   : true,
        trim        : true,
        required    : true,
        unique      : true
    },
    description: String,
    allowedToBrew: {
        type: Boolean,
        required: true,
        default: false
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
            this.markModified('name');
            return this.save();
        } catch (err) {
            throw err;
        }
    },

    /**
     * Change the bevera type name
     * 
     * @param {String} description 
     */
    changeDescription: function(description) {
        try {
            if(typeof description != "string") {
                throw new Error('The parameter provided is not a string.')
            }

            this.description = description;
            this.markModified('description');
            return this.save();
        } catch (err) {
            throw err;
        }
    },

    /**
     * Change the allowed to brew
     * 
     * @param {Boolean} allowed 
     */
    setAllowedToBrew: function(allowed) {
        try {
            if(typeof allowed != "boolean") {
                throw new Error('The parameter provided is not a boolean.')
            }

            this.allowedToBrew = allowed;
            this.markModified('allowedToBrea');
            return this.save();
        } catch (err) {
            throw err;
        }
    },
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
            if(typeof name !== "string") {
                throw new Error('Invalid name given');
            }

            return BeverageType.findOne({'name': name.toLowerCase()}).exec();
        } catch(err) {
            throw err;
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
                isLean      = (options.hasOwnProperty('lean')? options.lean : false);
        try {
            return BeverageType.find(criteria)
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

const BeverageType  = mongoose.model('BeverageType', BeverageTypeSchema);
module.exports      = BeverageType;