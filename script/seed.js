/* eslint-disable max-statements */
'use strict';
const fs = require('fs');
const faker = require('faker');

const {
  db,
  productTypes,
  User,
  Artist,
  Product,
  Order,
} = require('../server/db/models');

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
      // if it's a directory, recursively check for image files...
      paths = getAllImagePaths(path, paths);
    }
    // check if it's an image file, if it is, add it to our array
    else if (path.endsWith('.jpg') || path.endsWith('.png')) {
      paths.push(path.substring(6));
    }
  });
  return paths;
};
const allProductImages = getAllImagePaths();

/*
    PRODUCTS
*/
const createRandomProductTemplate = (title) => {
  const maxPrice = 500;
  return {
    title,
    price: randomFrom1ToMax(100 * maxPrice),
    image: randomChoice(allProductImages),
    type: randomChoice(productTypes),
    inventoryQuantity: Math.floor(Math.random() * 5),
  };
};
const createRandomProduct = (title) => {
  return Product.create(createRandomProductTemplate(title));
};

const createRandomProducts = (num, titleSuffix) => {
  return Product.bulkCreate(
    new Array(num)
      .fill(0)
      .map((e, i) => createRandomProductTemplate(`Product ${i}` + titleSuffix))
  );
};

/*
    ARTISTS
*/
const createArtists = (num) => {
  return Artist.bulkCreate(
    new Array(num).fill(0).map((e, i) => {
      return { name: `Artist ${i}` };
    })
  );
};

const seedArtistsAndProducts = async (numArtists, numProductsPerArtist) => {
  const artists = await createArtists(numArtists);

  for (let i = 0; i < numArtists; i++) {
    const products = await createRandomProducts(
      numProductsPerArtist,
      ` by Artist ${i}`
    );
    await artists[i].addProducts(products);
  }
  return artists;
};

/*
    ORDERS
*/

const createRandomOrderTemplate = () => {
  return {
    mailingAddress: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
    billingAddress: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
    phone: faker.phone.phoneNumber(),
  };
};
const createRandomOrder = () => {
  return Order.create(createRandomOrderTemplate());
};

const createRandomOrders = (num) => {
  return Order.bulkCreate(
    new Array(num).fill(0).map(() => createRandomOrderTemplate())
  );
};

const seedOrders = async (
  numUsersWhoOrdered,
  maxNumOrderItems,
  users,
  artists
) => {
  const getRandomProduct = async () => {
    const randArtist = randomChoice(artists);
    return randomChoice(await randArtist.getProducts());
  };

  if (numUsersWhoOrdered > users.length) numUsersWhoOrdered = users.length;

  for (let i = 0; i < numUsersWhoOrdered; i++) {
    let order = await Order.create({
      userId: users[i].id,
      ...createRandomOrderTemplate(),
    });

    const numItems = randomFrom1ToMax(maxNumOrderItems);
    for (let j = 0; j < numItems; j++) {
      await order.createOrderItem({
        quantity: randomFrom1ToMax(5),
        productId: (await getRandomProduct()).id,
      });
    }
  }
};

/*
    USERS
*/
const createRandomUserTemplate = (name, email, password) => {
  return { name, email, password };
};

const createRandomUser = (name, email, password) => {
  return User.create(createRandomUserTemplate(name, email, password));
};

const createRandomUsers = (num) => {
  return User.bulkCreate(
    new Array(num)
      .fill(0)
      .map((e, i) =>
        createRandomUserTemplate(
          `User ${i}`,
          `User${i}@site.com`,
          `password${i}`
        ))
  );
};

const seed = async (
  numArtists = 2,
  numProductsPerArtist = 2,
  numUsers = 3,
  numUsersWhoOrdered = 2,
  maxNumOrderItems = 5
) => {
  try {
    await db.sync({ force: true });
    console.log('db synced!');
    const artists = await seedArtistsAndProducts(
      numArtists,
      numProductsPerArtist
    );
    const users = await createRandomUsers(numUsers);
    await seedOrders(numUsersWhoOrdered, maxNumOrderItems, users, artists);
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

// export helper functions for tests
module.exports = {
  seed,
  createRandomProductTemplate,
  createRandomProduct,
  createRandomProducts,
  createRandomUserTemplate,
  createRandomUser,
  createRandomUsers,
  createRandomOrderTemplate,
  createRandomOrder,
  createRandomOrders,
};
