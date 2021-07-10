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

}

/**
 * Statics
 */
BeverageTypeSchema.statics = {
    
}

module.exports = mongoose.model('BeverageType', BeverageTypeSchema);