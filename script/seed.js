/* eslint-disable max-statements */
'use strict';

const fs = require('fs');
const faker = require('faker');

const { db, User, Artist, Product, Order, OrderItem } = require('../server/db/models');

/*
    helper functions
*/
const randomChoice = (choices) => {
    return choices[Math.floor(Math.random() * choices.length)];
};
const randomFrom1ToMax = (max) => {
    return Math.floor(Math.random() * max) + 1;
};
/*
    get all the possible image paths in our public/ directory
*/
const getAllImagePaths = function (dir = 'public', paths = []) {
    fs.readdirSync(dir).forEach((file) => {
        const path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            // if it's a direcotry, recursively cehck for image files...
            paths = getAllImagePaths(path, paths);
        }
        // check if it'a an image file, if it is, add it to our array
        else if (path.endsWith('.jpg') || path.endsWith('.png')) {
            paths.push(path.substring(6));
        }
    });
    return paths;
};

const allProductImages = getAllImagePaths();
const allProductTypes = ['Print - Limited Edition', 'Print', 'Unique Artwork'];

const createRandomProduct = (title) => {
    return Product.create({
        title,
        price: faker.commerce.price(),
        image: randomChoice(allProductImages),
        type: randomChoice(allProductTypes)
    });
};

const seedArtistsAndProducts = async (numArtists, numProductsPerArtist) => {
    let artists = [];
    for (let i = 0; i < numArtists; i++) {
        const artistName = `Artist ${i + 1}`;
        const artist = await Artist.create({ name: artistName });
        artists.push(artist);
        const products = [];
        for (let j = 0; j < numProductsPerArtist; j++)
            products.push((await createRandomProduct(`Product ${j + 1} by ${artistName}`)));
        await artist.addProducts(products);
    }
    return artists;
};

const seedOrders = async (numUsersWhoOrdered, maxNumOrderItems, users, artists) => {

    const getRandomProduct = async () => {
        const randArtist = randomChoice(artists);
        return randomChoice((await randArtist.getProducts()));
    };

    if (numUsersWhoOrdered > users.length)
        numUsersWhoOrdered = users.length;

    const orders = [];
    for (let i = 0; i < numUsersWhoOrdered; i++) {
        const order = await Order.create();
        await users[i].addOrder(order);
        const orderItems = [];
        const numItems = randomFrom1ToMax(maxNumOrderItems);
        for (let j = 0; j < numItems; j++) {
            const orderItem = await OrderItem.create({ quantity: randomFrom1ToMax(5) });
            await orderItem.setProduct((await getRandomProduct()));
            orderItems.push(orderItem);
        }
        await order.addOrderItems(orderItems);
        orders.push(order);
    }
    return orders;
};

const createRandomUser = async (name, email, password) => {
    return User.create({
        name, email, password,
        mailingAddress: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
        billingAddress: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
        phone: faker.phone.phoneNumber(),
    });
};

const seedUsers = async (num) => {
    let users = [];
    for (let i = 1; i <= num; i++)
        users.push((await createRandomUser(`User ${i}`, `User${i}@site.com`, `password${i}`)));
    return users;
};

const seed = async (numArtists = 2, numProductsPerArtist = 2, numUsers = 3, numUsersWhoOrdered = 2, maxNumOrderItems = 5) => {
    try {
        await db.sync({ force: true });
        console.log('db synced!');
        const artists = await seedArtistsAndProducts(numArtists, numProductsPerArtist);
        const users = await seedUsers(numUsers);
        const orders = await seedOrders(numUsersWhoOrdered, maxNumOrderItems, users, artists);
        console.log(`seeded successfully`);
    }
    catch (err) {
        console.log(err);
    }
};

async function runSeed() {
    console.log('seeding...');
    try {
        await seed();
    }
    catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
    finally {
        console.log('closing db connection');
        await db.close();
        console.log('db connection closed');
    }
}

if (module === require.main) {
    runSeed();
}

module.exports = { seed, createRandomProduct, createRandomUser };

