const {expect}	= require('chai')
const mongoUnit = require('mongo-unit')
const dao		= require('../dao')
const testData	= require('./data.json')

describe('General testing', ()=>{
  
    before(() => dao.init())
    beforeEach(() => mongoUnit.load(testData))
    afterEach(() => mongoUnit.drop())
  
    it('should verify that it returns all ingredients', async () => {
		return dao.Ingredient.list({'isLean': true}).then(res => {
			expect(res).to.be.a('array');
			expect(res).to.have.lengthOf(2);
		});
    })

    it('should verify that it returns all beverages', async () => {
		return dao.Beverage.list({'isLean': true}).then(res => {
			expect(res).to.be.a('array');
			expect(res).to.have.lengthOf(1);
		});
	})

	it('should verify that settings are updated', async () => {
		let beverage	= await  dao.Beverage.load('green_tea'),
			settings	= {
				"settings": {
					"test"		: 1,
					"teste_2"	: 2
				}
			};
		
		beverage.updateSettings(settings).then(res => {
			expect(res.settings).to.be.a('array');
			expect(res.settings).to.eql(settings);
		});
	})

	it('should verify that the single setting is updated', async () => {
		let beverage	= await  dao.Beverage.load('green_tea'),
			setting		= 'waterTemp',
			value		= 100;
		
		beverage.updateSettingsComponent(setting, value).then(res => {
			expect(res.settings.setting).to.be.eql(value);
		});
	})

	it('should verify that the order is completed', async () => {
		let orderList = await dao.Order.list({
				'limit': 1
			}),
			order = orderList[0];

		order.complete().then(() => {
			expect(order.status.completed).to.be.eql(true);
			expect(order.status.active).to.be.eql(false);
		});
	})

	it('should verify that the order is canceled', async () => {
		let orderList = await dao.Order.list({
			'limit': 1
		}),
		order = orderList[0];
		
		order.complete().then(() => {
			expect(order.status.completed).to.be.eql(false);
			expect(order.status.active).to.be.eql(false);
		});
	})


})