/* global describe beforeEach it */

const {expect} = require('chai');
const { db, OrderItem, Artist } = require('.');

// get some dummy data
const { createRandomOrders, createRandomOrder, createRandomProduct, createRandomProducts, createRandomUser } = require('../../../script/seed');


describe('Model Associations', () => {
    beforeEach(() => {
        return db.sync({force: true});
    });

    describe('Product Associations', () => {
        let artist;
        let products;

        beforeEach(async () => {
            artist = await Artist.create({name: 'Test Artist'});
            products = await createRandomProducts(2);
        });

        const addAndReturn = async () => {
            await artist.addProducts(products);
            return artist.getProducts();
        };
        it('expects Artist Products to start as an empty array', async () => {
            const prods = await artist.getProducts();
            expect(prods).to.deep.equal([]);
        });
        it('expects Artist Products to reflect Artist\'s given products', async () => {
            const prods = await addAndReturn();
            expect(prods.length).to.be.equal(products.length);
        });
        it('expects Artist Products to belong to Artist', async () => {
            const prods = await addAndReturn();
            expect(prods[0].artistId).to.be.equal(artist.id);
        });
    });

    describe('Order Associations', () => {
        let order;
        let orderItems;
        beforeEach(async () => {
            order = await createRandomOrder();
            const product = await createRandomProduct('prod');
            orderItems = await OrderItem.bulkCreate([
                { productId: product.id },
                { productId: product.id }
            ]);
        });
        const addAndReturn = async () => {
            await order.addOrderItems(orderItems);
            return order.getOrderItems();
        };
        it('expects order orderItems to start as an empty array', async () => {
            const ois = await order.getOrderItems();
            expect(ois).to.deep.equal([]);
        });
        it('expects order orderItems to reflect order\'s elements', async () => {
            const ois = await addAndReturn();
            expect(ois.length).to.be.equal(orderItems.length);
        });
        it('expects order orderItems to belong to order', async () => {
            const ois = await addAndReturn();
            expect(ois[0].orderId).to.be.equal(order.id);
        });

    });

    describe('User Associations', () => {
        let user, orders;
        beforeEach(async () => {
            user = await createRandomUser(`User`, `User@site.com`, `password`);
            orders = await createRandomOrders(3);
        });
        const addAndReturn = async () => {
            await user.addOrders(orders);
            return user.getOrders();
        };
        it('expects user orders to start as an empty array', async () => {
            const userorders = await user.getOrders();
            expect(userorders).to.deep.equal([]);
        });
        it('expects user orders to reflect orders made', async () => {
            const userorders = await addAndReturn();
            expect(userorders.length).to.be.equal(orders.length);
        });
        it('expects user orders to belong to user', async () => {
            const userorders = await addAndReturn();
            expect(userorders[0].userId).to.be.equal(user.id);
        });
    });
}); // end describe('User model')
