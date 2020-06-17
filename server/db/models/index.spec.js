/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const { Order, OrderItem, User, Product, Artist } = require('.');

// get some dummy data
const productsSeed = require('../../../script/seed-product');
const orderSeed = require('../../../script/orders.seed');
const orderItemsSeed = require('../../../script/orderItem.seed');
const userSeed = require('../../../script/seedUsers');
const artistSeed = require('../../../script/seed-artist');

describe('Model Associations', () => {
    beforeEach(() => {
        return db.sync({force: true});
    });

    describe('Product Associations', () => {
        let artist;
        let products;

        beforeEach(async () => {
            artist = await Artist.create(artistSeed[0]);
            products = [];
            for (let i = 0; i < 2; i++)
                products.push((await Product.create(productsSeed[i])));
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
            order = await Order.create(orderSeed[0]);
            orderItems = [];
            for (let i = 0; i < 2; i++)
                orderItems.push((await OrderItem.create(orderItemsSeed[i])));
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
        let user, orders, cart;
        beforeEach(async () => {
            user = await User.create(userSeed[0]);
            orders = [];
            for (let i = 0; i < 3; i++)
                orders.push((await Order.create(orderSeed[0])));
            cart = await Order.create(orderSeed[0]);
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
        it('expects user cart to start as null', async () => {
            const c = await user.getCart();
            expect(c).to.be.equal(null);
        });
        it('expects user cart to be the order it was initialized to', async () => {
            await user.setCart(cart);
            const c = await user.getCart();
            expect(c.id).to.be.equal(cart.id);
        });
    });
}); // end describe('User model')
