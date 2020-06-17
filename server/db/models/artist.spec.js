const { expect } = require('chai');
const db = require('../index');
const Artist = db.model('artist');

describe('Artist Model', () => {
    let artist;
    beforeEach(() => {
        artist = {
            name: 'Claudia Saimbert',
        };
        return db.sync({ force: true });
    });
    it('has field name', async () => {
        const newArtist = await Artist.create(artist);
        expect(newArtist.name).to.equal('Claudia Saimbert');
    });
    it('requires `name`', async () => {
        const blankArtist = Artist.build();
        try {
            await blankArtist.validate();
            throw Error(
                'WOMP WOMP, validation should have failed without name'
            );
        } catch (err) {
            expect(err.message).to.contain('name cannot be null');
        }
    });
});
