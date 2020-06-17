import React from 'react';

const SingleProduct = (props) => {
    const { product } = props;
    const AnjelDirectoryFiles = [
        'Black_is_beautiful.jpg',
        'Fraternity.jpg',
        'Shades_of_Pride.jpg',
        'Sweet_Cabata.jpg',
    ];
    const BennyBingDirectoryFiles = [
        'DJAMILLA.png',
        'KENYA.png',
        'NISAA.png',
        'OHSO.png',
    ];
    const ClaudiaSaimbertDirectoryFiles = [
        'Kira.png',
        'Rachel.jpg',
        'Sarah.jpg',
        'Yas.jpg',
    ];
    const DavidThukuDirectoryFiles = [
        'Untitled_III.jpg',
        'Untitled_IV.jpg',
        'Untitled_IX.jpg',
        'Untitled_VII.jpg',
    ];
    const DeanaLawsonDirectoryFiles = [
        'Cortez.jpg',
        'Eternity.jpg',
        'LivingRoom_Brownsville_Brooklyn.jpg',
        'Mickey&Friends.jpg',
    ];
    const MicaiahCarterDirectoryFiles = [
        'AndersonPaak.jpg',
        'Father.png',
        'JeremyOHarris.png',
        'KittyCat.png',
    ];
    const directoryOfProduct = AnjelDirectoryFiles.includes(product.image)
        ? '/Anjel'
        : BennyBingDirectoryFiles.includes(product.image)
        ? '/Benny_Bing'
        : ClaudiaSaimbertDirectoryFiles.includes(product.image)
        ? '/Claudia_Saimbert'
        : DavidThukuDirectoryFiles.includes(product.image)
        ? '/David_Thuku_Empty_Seat_Series_2019'
        : DeanaLawsonDirectoryFiles.includes(product.image)
        ? '/Deana Lawson'
        : MicaiahCarterDirectoryFiles.includes(product.image)
        ? '/Micaiah_Carter'
        : '/Micaklene_Thomas';

    return (
        <div>
            <p>{product.title.toUpperCase()}</p>
            <img
                src={`${directoryOfProduct}/${product.image}`}
                width={500}
                alt={product.title}
            />
            <p>${product.price.toLocaleString('en-US')}</p>
        </div>
    );
};

export default SingleProduct;
