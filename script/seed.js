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

        await Promise.all(arrayOfUsers.map(user => {
            return User.create(user);
        }));
        await Promise.all(ArtistSeed.map(artist => {
            return Artist.create(artist);
        }));
        await Promise.all(ProductSeed.map(product => {
            return Product.create(product);
        }));

        await Promise.all(OrderSeed.map(order => {
            return Order.create(order);
        }));
        await Promise.all(OrderItemSeed.map(item => {
            return OrderItem.create(item);
        }));

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
