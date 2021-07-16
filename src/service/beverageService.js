const Beverage      = require('../model/beverage');

module.exports = {
    /**
     * Verifies if the beverage is available to brew
     * 
     * @param {String} beverageName
     */
    verifyBeverageIsBrewable: async function(beverageName) {
        try {
            // Verify if the beverage received is allowed to be brewed
            let beverage = await Beverage.load(beverageName);
            if(beverage == null) {
                throw new Error("This beverage("+beverageName+") doesn't exist.")
            }
            // If the beverage type isn't allowed to brew then cancel the order
            if(!beverage.beverageType.allowedToBrew) {
                throw new Error("This type ("+beverage.beverageType.name+") of beverage is not possible to brew.")
            }

            return true;
        } catch (err) {
            throw err
        }
    }
}