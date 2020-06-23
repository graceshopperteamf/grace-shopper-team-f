const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

const { createRandomUser } = require('../../../script/seed');

const codyTemplate = () => {
    return {
        name: 'Cody Tremblay',
        email: 'Brent.Reichel5@yahoo.com',
        password: 'bones are yummy'
    };
};

describe('User model', () => {
    beforeEach(() => db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    describe('instanceMethods', () => {
        describe('correctPassword', async () => {

            const cody = await createRandomUser('Cody Tremblay', 'Brent.Reichel5@yahoo.com', 'bones are yummy');

            it('returns true if the password is correct', () => {
                expect(cody.correctPassword('bones are yummy')).to.be.equal(true);
            });
            it('returns false if the password is incorrect', () => {
                expect(cody.correctPassword('bonez')).to.be.equal(false);
            });
        });
    });

    describe('column definitions', () => {
        it('has a `name`, `email`, `password`, `isAdmin`', async () => {
            const cody = await User.create(codyTemplate());

            expect(cody.name).to.equal('Cody Tremblay');
            expect(cody.email).to.equal('Brent.Reichel5@yahoo.com');
            expect(cody.correctPassword('bones are yummy')).to.be.equal(true);
            expect(cody.isAdmin).to.equal(false);
        });
    });

    describe('column validations', () => {
        let user;
        beforeEach(() => {
            user = codyTemplate();
        });

        const validationTestNull = (testColumn) => {
            return async () => {
                delete user[testColumn];
                const userWithoutColumn = await User.build(user);
                try {
                    await userWithoutColumn.validate();
                    throw new Error(`validation was successful but should have failed without '${testColumn}'`);
                }
                catch (err) {
                    expect(err.message).to.contain(`${testColumn} cannot be null`);
                }
            };
        };
        it('`name` is required', validationTestNull('name'));

        const validationTestEmpty = (testColumn) => {
            return async () => {
                user[testColumn] = '';
                const createdUser = await User.build(user);
                try {
                    await createdUser.validate();
                    throw Error(`validation was successful but should have failed if ${testColumn} is an empty string`);
                }
                catch (err) {
                    expect(err.message).to.contain('Validation error');
                }
            };
        };
        it('requires `name` to not be an empty string', validationTestEmpty('name'));
        it('requires `email` to not be an empty string', validationTestEmpty('email'));

        it('`isAdmin` has a default value of false', async () => {
            const createdUser = await User.build({ user });
            expect(createdUser.isAdmin).to.equal(false);
        });

        it('password length must be between 8 and 64', async () => {
            try {
                user.password = 'bones';
                const cody = await User.create(user);
                if (cody)
                    throw Error('Validation should have failed with a password < 8');
            }
            catch (err) {
                expect(err.message).to.not.have.string('Validation should have failed');
            }
            try {
                user.password = 'VDPUgM4ZHA33OVkgyYWbe7s587q0hoUBOSrvpN6oUacKEt1MAyHuZTcbUf2r6TJ5kN1WSvlr2dTTVyKq2grzgU7MlBv4ew5WSn24';
                const cody = await User.create(user);
                if (cody)
                    throw Error('Validation should have failed with a password length > 64');
            }
            catch (err) {
                expect(err.message).to.not.have.string('Validation should have failed');
            }
        });

        it('cannot have a duplicate email', async () => {
            try {
                let cody = await createRandomUser('Cody Tremblay', 'Brent.Reichel5@yahoo.com', 'bones are yummy');
                await cody.validate();
                let anne = await createRandomUser('Anne Tremblay', 'Brent.Reichel5@yahoo.com', 'bones are yummy');
                await anne.validate();
                throw new Error('Validation should have failed!');
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });
    });

    describe('can add many users', () => {
        it('it has a length of 10', async () => {
            const users = await User.bulkCreate(
                (new Array(10).fill(0).map((e, i) => {
                    return {
                        ...codyTemplate(),
                        name: `user ${i}`,
                        email: `user${i}@yahoo.com`
                    };
                }))
            );
            expect(users.length).to.equal(10);
        });
    });
});
