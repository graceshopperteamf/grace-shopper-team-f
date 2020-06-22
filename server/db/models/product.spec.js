const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product Model', () => {
    let product;
    beforeEach(() => {
        product = {
            title: 'Kira',
            price: 350,
            image: '/public/Claudia_Saimbert/Kira.png',
            type: 'Print - Limited Edition',
            inventoryQuantity: 10
        };
        return db.sync({ force: true });
    });
    it('has fields title, price, image, type', async () => {
        const newProduct = await Product.create(product);
        expect(newProduct.title).to.equal('Kira');
        expect(newProduct.price).to.equal(350);
        expect(newProduct.image).to.equal('/public/Claudia_Saimbert/Kira.png');
        expect(newProduct.type).to.equal('Print - Limited Edition');
        expect(newProduct.inventoryQuantity).to.equal(10);
    });
    it('title cannot be null', async () => {
        const blankProduct = Product.build();
        try {
            await blankProduct.validate();
            throw Error(
                'WOMP WOMP, validation should have failed without title'
            );
        } catch (err) {
            expect(err.message).to.contain('title cannot be null');
        }
    });

    it('inventoryQuantity cannot be null', async () => {
        delete product.inventoryQuantity;

        const blankProduct = Product.build(product);
        try {
            await blankProduct.validate();
            throw Error(
                'WOMP WOMP, validation should have failed without quantity'
            );
        } catch (err) {
            expect(err.message).to.contain('inventoryQuantity cannot be null');
        }
    });

    it('price cannot be less than 0', async () => {
        product.price = -300;
        try {
            const negativePrice = await Product.create(product);
            if (negativePrice) {
                throw Error('Umm...No, Price cannot be less than 0');
            }
        } catch (err) {
            expect(err.message).to.not.have.string(
                'WOMP WOMP, validation should have failed'
            );
        }
    });

    it('type can only be Unique Artwork, Print - Limited Edition, or Print (defaults to Print)', async () => {
        product.type = 'Painting';
        try {
            const wrongType = await Product.create(product);
            if (wrongType) {
                throw Error('DANG!!!Invalid Type');
            }
        } catch (err) {
            expect(err.message).to.not.have.string('Sorry Homie');
        }
        delete product.type;
        const defaultType = await Product.create(product);
        expect(defaultType.type).to.equal('Print');
    });
});
