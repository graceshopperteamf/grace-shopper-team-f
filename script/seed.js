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

const getAllImagePaths = function(dirPath = 'public', arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
        const fPath = dirPath + '/' + file;
        if (fs.statSync(fPath).isDirectory())
            arrayOfFiles = getAllImagePaths(fPath, arrayOfFiles);
        else if (fPath.endsWith('.jpg') || fPath.endsWith('.png')) {
                arrayOfFiles.push(fPath.substring(6));
            }
    });
    return arrayOfFiles;
};

const allProductImages = getAllImagePaths();
const allProductTypes = [ 'Print - Limited Edition', 'Print', 'Unique Artwork' ];


const createRandomProduct = (title) => {
    return Product.create({
        title: title,
        price: faker.commerce.price(),
        image: randomChoice(allProductImages),
        type: randomChoice(allProductTypes)
    });
};

const seedArtistsAndProducts = async (numArtists, numProductsPerArtist) => {
    let artists = [];
    for (let i = 0; i < numArtists; i++) {
        const artistName = `Artist ${i + 1}`;
        const artist = await Artist.create({name: artistName});
        artists.push(artist);
        const products = [];
        for (let j = 0; j < numProductsPerArtist; j++) {
            const product = await createRandomProduct(`Product ${j + 1} by ${artistName}`);
            products.push(product);
        }
        await artist.addProducts(products);
    }
    return artists;
};

const seedOrders = async (numUsersWhoOrdered, maxNumOrderItems, users, artists) => {

    const getRandomProduct = async () => {
        const artistProducts = await randomChoice(artists).getProducts();
        return randomChoice(artistProducts);
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
        name: name,
        email: email,
        password: password,
        mailingAddress: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
        billingAddress: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
        phone: faker.phone.phoneNumber(),
    });
};

const seedUsers = async (num) => {
    let users = [];
    for (let i = 0; i < num; i++) {
        users.push((await createRandomUser(`User ${i + 1}`, `User${i + 1}@site.com`, `password${i + 1}`)));
    }
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

module.exports = { seed, createRandomProduct, createRandomUser };

