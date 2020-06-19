const chai = require('chai');
const expect = chai.expect;
const OrderItem = require('./orderItem');

//Order Item
describe('Order Item Validation', () => {
    it('contains quantity', async () => {
        const newOrder = await OrderItem.create({quantity: 2});
        expect(newOrder.quantity).to.equal(2);
    });
    it('quantity cannot be less than 0', async () => {
        try {
            const oi = await OrderItem.create({quantity: -1});
            if (oi)
                throw Error('Validation Test Error');
        }
        catch (err) {
            expect(err.message).to.not.have.string('Validation Test Error');
        }
    });
    it('quantity defaults to 1', async () => {
        const newOrder = await OrderItem.create();
        expect(newOrder.quantity).to.equal(1);
    });
});
