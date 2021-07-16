const Size          = require('../src/model/size');
const Ingredient    = require('../src/model/ingredient');
const BeverageType  = require('../src/model/beverageType');
const Beverage      = require('../src/model/beverage');
const Stock         = require('../src/model/stock');

module.exports = {
    init: async function() {
        try {
            // INIT SIZES
            let small = new Size({
                name: 'extraSmall',
                multiplier: 1
            });
            small.save();
            let medium = new Size({
                name: 'Medium',
                multiplier: 2
            });
            medium.save();
            let large = new Size({
                name: 'Large',
                multiplier: 3
            });
            large.save();
    
            // INIT INGREDIENTS
            let water = new Ingredient({
                name: 'Water',
                description: 'Simple water',
                unit: 'ml'
            });
            water.save(function(err) {
                if (err) throw err;
                console.log('[ingredient] water created');
            });
    
            let greenTeaLeaves = new Ingredient({
                name: 'Green Tea Leaf',
                description: 'The purest of green leafs',
                unit: 'unit'
            });
            greenTeaLeaves.save(function(err) {
                if (err) throw err;
                console.log('[ingredient] greenTea created');
            });
    
            // INIT TYPES
            let tea = new BeverageType({
                name: 'Tea',
                allowedToBrew: true
            });
            tea.save(function(err) {
                if (err) throw err;
                console.log('[beverageType] tea created');
            });
    
            // INIT STOCK
            let stock 		= await Stock.load();
            if(stock == null) {
                stock = new Stock({
                    ingredients: []
                });
            }
            await stock.addIngredient('Water', 1000);
            await stock.addIngredient('Green Tea Leaf', 25);
    
            // INIT BEVERAGE    
            let greenTea 		= new Beverage({
                name		: 'green_tea',
                beverageType: tea._id,
                recipe		: {
                    ingredients: [
                        {
                            ingredient: water._id,
                            quantity: 100
                        }, {
                            ingredient: greenTeaLeaves._id,
                            quantity: 1
                        }
                    ]
                },
                settings: {
                    waterTemp: 80
                }
            });
            greenTea.save(function(err) {
                if (err) throw err;
                console.log('[beverage] green tea created');
            });
        } catch(err) {
            throw err;
        }
    }
}
