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
        };
        return db.sync({ force: true });
    });
    it('has fields title, price, image, type', async () => {
        const newProduct = await Product.create(product);
        expect(newProduct.title).to.equal('Kira');
        expect(newProduct.price).to.equal(350);
        expect(newProduct.image).to.equal('/public/Claudia_Saimbert/Kira.png');
        expect(newProduct.type).to.equal('Print - Limited Edition');
    });

    const validationTestNull = (testColumn) => {
        return async () => {
            delete product[testColumn];
            const withoutColumn = await Product.build(product);
            try {
                await withoutColumn.validate();
                throw new Error(`validation was successful but should have failed without '${testColumn}'`);
            }
            catch (err) {
                expect(err.message).to.contain(`${testColumn} cannot be null`);
            }
        };
    };

    it('title cannot be null', validationTestNull('title'));
    it('price cannot be null', validationTestNull('price'));

    it('price cannot be less than 0', async () => {
        product.price = -300;
        try {
            const negativePrice = await Product.create(product);
            if (negativePrice)
                throw Error('Umm...No, Price cannot be less than 0');
        }
        catch (err) {
            expect(err.message).to.not.have.string('Umm...No, Price cannot be less than 0');
        }
    });

    it('type can only be Unique Artwork, Print - Limited Edition, or Print (defaults to Print)', async () => {
        product.type = 'Painting';
        try {
            const wrongType = await Product.create(product);
            if (wrongType)
                throw Error('DANG!!!Invalid Type');
        }
        catch (err) {
            expect(err.message).to.not.have.string('DANG!!!Invalid Type');
        }

        delete product.type;
        const defaultType = await Product.create(product);
        expect(defaultType.type).to.equal('Print');
    });

    it('has a default image if none specified', async () => {
        delete product.image;
        const defaultType = await Product.create(product);
        expect(defaultType.image).to.equal('default-image.png');
    });
});
