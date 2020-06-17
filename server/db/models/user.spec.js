const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
    beforeEach(() => db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    describe('instanceMethods', () => {
        describe('correctPassword', async () => {
            const cody = await User.create({
                name: 'Cody Tremblay',
                email: 'Brent.Reichel5@yahoo.com',
                password: 'bones are yummy',
                mailingAddress: '10533 Pouros Club McLaughlinton, ID 12345',
                billingAddress: '123 Gingerbread Brooklyn, NY 34343',
                phone: '987-232-7337',
            });

            it('returns true if the password is correct', () => {
                expect(cody.correctPassword('bones are yummy')).to.be.equal(
                    true
                );
            });

            it('returns false if the password is incorrect', () => {
                expect(cody.correctPassword('bonez')).to.be.equal(false);
            });
        });
    });

    describe('column definitions', () => {
        it('has a `name`, `email`, `password`, `mailingAddress`, `billingAddress`, `isAdmin`, and `phone`', async () => {
            const cody = await User.create({
                name: 'Cody Tremblay',
                email: 'Brent.Reichel5@yahoo.com',
                password: 'bones are yummy',
                mailingAddress: '10533 Pouros Club McLaughlinton, ID 12345',
                billingAddress: '123 Gingerbread Brooklyn, NY 34343',
                phone: '987-232-7337',
            });

            expect(cody.name).to.equal('Cody Tremblay');
            expect(cody.email).to.equal('Brent.Reichel5@yahoo.com');
            expect(cody.correctPassword('bones are yummy')).to.be.equal(true);
            expect(cody.mailingAddress).to.equal(
                '10533 Pouros Club McLaughlinton, ID 12345'
            );
            expect(cody.billingAddress).to.equal(
                '123 Gingerbread Brooklyn, NY 34343'
            );
            expect(cody.isAdmin).to.equal(false);
            expect(cody.phone).to.equal('987-232-7337');
        });
    });

    describe('column validations', () => {
        let user;
        beforeEach(() => {
            user = {
                name: 'Cody Tremblay',
                email: 'Brent.Reichel5@yahoo.com',
                password: 'bones are yummy',
                mailingAddress: '10533 Pouros Club McLaughlinton, ID 12345',
                billingAddress: '123 Gingerbread Brooklyn, NY 34343',
                phone: '987-232-7337',
            };
        });

        it('`name` is required', async () => {
            delete user.name;
            const userWithoutAName = await User.build(user);
            try {
                await userWithoutAName.validate();
                throw new Error(
                    'validation was successful but should have failed without `name`'
                );
            } catch (err) {
                expect(err.message).to.contain('name cannot be null');
            }
        });

        it('`mailing address` is required', async () => {
            delete user.mailingAddress;
            const userWithoutAMailingAddress = await User.build(user);
            try {
                await userWithoutAMailingAddress.validate();
                throw new Error(
                    'validation was successful but should have failed without `mailingAddress`'
                );
            } catch (err) {
                expect(err.message).to.contain('mailingAddress cannot be null');
            }
        });

        it('`billing address` is required', async () => {
            delete user.billingAddress;
            const userWithoutABillingAddress = await User.build(user);
            try {
                await userWithoutABillingAddress.validate();
                throw new Error(
                    'validation was successful but should have failed without `billingAddress`'
                );
            } catch (err) {
                expect(err.message).to.contain('billingAddress cannot be null');
            }
        });

        it('`phone` is required', async () => {
            delete user.phone;
            const userWithoutAPhone = await User.build(user);
            try {
                await userWithoutAPhone.validate();
                throw new Error(
                    'validation was successful but should have failed without `phone`'
                );
            } catch (err) {
                expect(err.message).to.contain('phone cannot be null');
            }
        });

        it('requires `name` to not be an empty string', async () => {
            user.name = '';
            const createdUser = await User.build(user);
            try {
                await createdUser.validate();
                throw Error(
                    'validation was successful but should have failed if name is an empty string'
                );
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });

        it('requires `email` to not be an empty string', async () => {
            user.email = '';
            const createdUser = await User.build(user);
            try {
                await createdUser.validate();
                throw Error(
                    'validation was successful but should have failed if email is an empty string'
                );
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });

        it('requires `mailingAddress` to not be an empty string', async () => {
            user.mailingAddress = '';
            const createdUser = await User.build(user);
            try {
                await createdUser.validate();
                throw Error(
                    'validation was successful but should have failed if mailingAddress is an empty string'
                );
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });

        it('requires `billingAddress` to not be an empty string', async () => {
            user.billingAddress = '';
            const createdUser = await User.build(user);
            try {
                await createdUser.validate();
                throw Error(
                    'validation was successful but should have failed if billingAddress is an empty string'
                );
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });

        it('requires `phone` to not be an empty string', async () => {
            user.phone = '';
            const createdUser = await User.build(user);
            try {
                await createdUser.validate();
                throw Error(
                    'validation was successful but should have failed if phone is an empty string'
                );
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });

        it('`isAdmin` has a default value of false', async () => {
            const createdUser = await User.build({ user });
            expect(createdUser.isAdmin).to.equal(false);
        });

        it('password length must be between 8 and 64', async () => {
            try {
                user.password = 'bones';
                const createdUser = await User.create(user);
                if (createdUser) {
                    throw Error(
                        'Validation should have failed with a password < 8'
                    );
                }
            } catch (err) {
                expect(err.message).to.not.have.string(
                    'Validation should have failed'
                );
            }

            try {
                user.password =
                    'VDPUgM4ZHA33OVkgyYWbe7s587q0hoUBOSrvpN6oUacKEt1MAyHuZTcbUf2r6TJ5kN1WSvlr2dTTVyKq2grzgU7MlBv4ew5WSn24';
                const cody = await User.create(user);
                if (cody) {
                    throw Error(
                        'Validation should have failed with a password length > 64'
                    );
                }
            } catch (err) {
                expect(err.message).to.not.have.string(
                    'Validation should have failed'
                );
            }
        });

        it('cannot have a duplicate email', async () => {
            let cody;
            let anne;

            try {
                cody = await User.create({
                    name: 'Cody Tremblay',
                    email: 'Brent.Reichel5@yahoo.com',
                    password: 'bones are yummy',
                    mailingAddress: '10533 Pouros Club McLaughlinton, ID',
                    billingAddress: '123 Gingerbread Brooklyn, NY 34343',
                    phone: '987-232-7337',
                });
                await cody.validate();
                anne = await User.create({
                    name: 'Anne Tremblay',
                    email: 'Brent.Reichel5@yahoo.com',
                    password: 'bones are yummy',
                    mailingAddress: '10533 Pouros Club McLaughlinton, ID',
                    billingAddress: '123 Gingerbread Brooklyn, NY 34343',
                    phone: '987-232-7337',
                });
                await anne.validate();
                throw new Error('Validation should have failed!');
            } catch (err) {
                expect(err.message).to.contain('Validation error');
            }
        });
    });

    describe('can add many users', () => {
        it('it has a length of 10', async () => {
            const users = await Promise.all([
                User.create({
                    name: 'Jazmyne Tremblay',
                    email: 'Brent.Reichel5@yahoo.com',
                    password: 'Jazmyne Tremblay',
                    mailingAddress: '10533 Pouros Club McLaughlinton, ID 12345',
                    billingAddress: '123 Gingerbread Brooklyn, NY 34343',
                    phone: '987-232-7337',
                }),
                User.create({
                    name: 'Dejuan Kohler',
                    email: 'Gus5@gmail.com',
                    password: 'Dejuan Kohler',
                    mailingAddress: '17322 Gus Fields Averyside, DE 41999',
                    billingAddress:
                        '37856 Valentine Trail North Erikachester, NJ 72501-2960',
                    phone: '133-799-3693',
                }),
                User.create({
                    name: 'Deshawn Stamm',
                    email: 'Deshawn.Stamm37@hotmail.com',
                    password: 'Deshawn Stamm',
                    mailingAddress:
                        '1908 Schimmel Causeway Kozeyborough, MI 71079',
                    billingAddress:
                        '1908 Schimmel Causeway Kozeyborough, MI 71079',
                    phone: '133-799-3693',
                }),
                User.create({
                    name: 'Marquise Davis',
                    email: 'Giovanna.Nitzsche@gmail.com',
                    password: 'Marquise Davis',
                    mailingAddress: '1234 Moby Burgs West Lenore, VA 03036',
                    billingAddress:
                        '21845 Herminia Locks South Jaimebury, CT 2945',
                    phone: '796-243-4340',
                }),
                User.create({
                    name: 'Creola Jaskolski',
                    email: 'Kenya_Botsford7@gmail.com',
                    password: 'Creola Jaskolski',
                    mailingAddress:
                        '1509 Jayne Ranch Audreannechester, IN 10308',
                    billingAddress:
                        '2682 Candelario Square East Emmie, NH 62287',
                    phone: '799-155-9995',
                }),
                User.create({
                    name: 'Reyes Lind',
                    email: 'Gudrun36@yahoo.com',
                    password: 'Reyes Lind',
                    mailingAddress: '29481 Grover Fort Port Deangelo, VI 46681',
                    billingAddress:
                        '6381 Bartell Course Harmonyhaven, NC 21588',
                    phone: '385-551-4291',
                }),
                User.create({
                    name: 'Abbie Hyatt',
                    email: 'Ines_Rippin98@yahoo.com',
                    password: 'Abbie Hyatt',
                    mailingAddress:
                        '63314 Rutherford Hill Angelinaton, OH 52771',
                    billingAddress:
                        '378 Dayne Throughway Shieldsland, OH 12723',
                    phone: '436-964-9059',
                }),
                User.create({
                    name: 'Elta Terry',
                    email: 'Xavier45@gmail.com',
                    password: 'Elta Terry',
                    mailingAddress: '3167 Jaunita Fields Lockmanport, RI 29041',
                    billingAddress: '3167 Jaunita Fields Lockmanport, RI 29041',
                    phone: '433-118-2476',
                }),
                User.create({
                    name: 'Peyton Rohan',
                    email: 'Jasper_Spencer@yahoo.com',
                    password: 'Peyton Rohan',
                    mailingAddress: '987 Moriah Light New Saige, NM 92902',
                    billingAddress: '987 Moriah Light New Saige, NM 92902',
                    phone: '112-099-9281',
                }),
                User.create({
                    name: 'Karen Bayer',
                    email: 'Kassandra.Greenholt88@gmail.com',
                    password: 'Karen Bayer',
                    mailingAddress:
                        '3172 Runolfsdottir Isle Ethelfurt, RI 41456',
                    billingAddress:
                        '3172 Runolfsdottir Isle Ethelfurt, RI 41456',
                    phone: '282-724-2375',
                }),
            ]);
            expect(users.length).to.equal(10);
        });
    });
});
