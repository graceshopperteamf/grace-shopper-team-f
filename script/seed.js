/* eslint-disable max-statements */
'use strict';

const db = require('../server/db');
const arrayOfUsers = require('./seedUsers');
const User = require('../server/db/models/user');
const ArtistSeed = require('./seed-artist');
const ProductSeed = require('./seed-product');
const OrderSeed = require('./orders.seed');
const OrderItemSeed = require('./orderItem.seed');
const Product = require('../server/db/models/product');
const Order = require('../server/db/models/order');
const OrderItem = require('../server/db/models/orderItem');
const Artist = require('../server/db/models/artist');

const seed = async () => {
    try {
        await db.sync({ force: true });
        console.log('db synced!');

        let users = await Promise.all(arrayOfUsers.map(user => {
            return User.create(user);
        }));
        let art = await Promise.all(ArtistSeed.map(artist => {

            return Artist.create(artist);
        }));
        let prods = await Promise.all(ProductSeed.map(product => {
            return Product.create(product);
        }));

        let cart = await Promise.all(OrderSeed.map(order => {
            return Order.create(order);
        }));
        let items = await Promise.all(OrderItemSeed.map(item => {
            return OrderItem.create(item);
        }));
        // eslint-disable-next-line no-proto

        //artitst has products
        // console.log(prods[0].__proto__);

        for (let i = 0; i < art.length; i++) {
            let artist = art[i];
            for (let j = 0; j < 4; j++) {
                let test = prods[i * 4 + j];
                await artist.addProduct(test);

            }

        }

        // for (let i = 0; i < cart.length; i++) {
        //     let order = cart[i];

        // };

        // await cart.addOrderItem(item[0]);

        console.log(art, 'ARTTTTT');
        // console.log(cart[0].__proto__);
        // console.log(cart[0].__proto__);

        // eslint-disable-next-line no-proto

        console.log(`seeded successfully`);
    } catch (err) {
        console.log(err);
    }
};

async function runSeed() {
    console.log('seeding...');
    try {
        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log('closing db connection');
        await db.close();
        console.log('db connection closed');
    }
}

if (module === require.main) {
    runSeed();
}

module.exports = seed;
