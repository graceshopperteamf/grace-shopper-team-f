const chai = require('chai');
const expect = chai.expect;

const { db, OrderItem, Order } = require('../models');

const { createRandomProduct, createRandomOrderTemplate } = require('../../../script/seed');

describe('Order model', () => {
    beforeEach(() => db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    describe('column definitions', () => {
        it('has a `mailingAddress`, `billingAddress`, and `phone`', async () => {
            const template = createRandomOrderTemplate();
            const order = await Order.create(template);
            expect(order.mailingAddress).to.equal(template.mailingAddress);
            expect(order.billingAddress).to.equal(template.billingAddress);
            expect(order.phone).to.equal(template.phone);
        });
    });

    describe('column validations', () => {
        let template;
        beforeEach(() => {
            template = createRandomOrderTemplate();
        });

        const validationTestNull = (testColumn) => {
            return async () => {
                delete template[testColumn];
                const withoutColumn = await Order.build(template);
                try {
                    await withoutColumn.validate();
                    throw new Error(`validation was successful but should have failed without '${testColumn}'`);
                }
                catch (err) {
                    expect(err.message).to.contain(`${testColumn} cannot be null`);
                }
            };
        };
        it('`mailing address` is required', validationTestNull('mailingAddress'));
        it('`billing address` is required', validationTestNull('billingAddress'));
        it('`phone` is required', validationTestNull('phone'));

        const validationTestEmpty = (testColumn) => {
            return async () => {
                template[testColumn] = '';
                const created = await Order.build(template);
                try {
                    await created.validate();
                    throw Error(`validation was successful but should have failed if ${testColumn} is an empty string`);
                }
                catch (err) {
                    expect(err.message).to.contain('Validation error');
                }
            };
        };
        it('requires `mailingAddress` to not be an empty string', validationTestEmpty('mailingAddress'));
        it('requires `billingAddress` to not be an empty string', validationTestEmpty('billingAddress'));
        it('requires `phone` to not be an empty string', validationTestEmpty('phone'));

    });
});


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
