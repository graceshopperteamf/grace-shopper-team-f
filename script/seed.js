'use strict';

const db = require('../server/db');
const arrayOfUsers = require('./seedUsers');
const User = require('../server/db/models/user');

async function seed() {
    await db.sync({ force: true });
    console.log('db synced!');

    const users = await Promise.all(
        arrayOfUsers.map((user) => User.create(user))
    );

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
}

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
