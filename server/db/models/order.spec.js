const chai = require('chai');
const expect = chai.expect;

const { db, OrderItem } = require('../models');

const { createRandomProduct } = require('../../../script/seed');

//Order Item
describe('Order Item Validation', () => {
    let forProd;
    beforeEach(async () => {
        await db.sync({force: true});
        forProd = await createRandomProduct('product');
    });

    it('contains quantity', async () => {
        const newOrder = await OrderItem.create({quantity: 2, productId: forProd.id});
        expect(newOrder.quantity).to.equal(2);
    });
    it('quantity cannot be less than 0', async () => {
        try {
            const oi = await OrderItem.create({quantity: -1, productId: forProd.id});
            if (oi)
                throw Error('Validation Test Error');
        }
        catch (err) {
            expect(err.message).to.not.have.string('Validation Test Error');
        }
    });
    it('quantity defaults to 1', async () => {
        const newOrder = await OrderItem.create({ productId: forProd.id });
        expect(newOrder.quantity).to.equal(1);
    });
});
