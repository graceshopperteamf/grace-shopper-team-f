const { User } = require('../server/db/models');

const arrayOfUsers = [
    {
        name: 'Jazmyne Tremblay',
        email: 'Brent.Reichel5@yahoo.com',
        password: 'james',
        mailingAddress: '10533 Pouros Club McLaughlinton, ID',
        billingAddress: '123 Gingerbread Brooklyn, NY 34343',
        phone: '987-232-7337',
    },
    {
        name: 'Dejuan Kohler',
        email: 'Gus5@gmail.com',
        password: 'Dejuan Kohler',
        mailingAddress: '17322 Gus Fields Averyside, DE 41999',
        billingAddress:
            '37856 Valentine Trail North Erikachester, NJ 72501-2960',
        phone: '133-799-3693',
    },
    {
        name: 'Deshawn Stamm',
        email: 'Deshawn.Stamm37@hotmail.com',
        password: 'Lorenzo Rempel',
        mailingAddress: '1908 Schimmel Causeway Kozeyborough, MI 71079',
        billingAddress: '1908 Schimmel Causeway Kozeyborough, MI 71079',
        phone: '133-799-3693',
    },
    {
        name: 'Marquise Davis',
        email: 'Giovanna.Nitzsche@gmail.com',
        password: 'Lorenzo Rempel',
        mailingAddress: 'oby Burgs West Lenore, VA 03036',
        billingAddress: '21845 Herminia Locks South Jaimebury, CT 2945',
        phone: '796-243-4340',
    },
    {
        name: 'Creola Jaskolski',
        email: 'Kenya_Botsford7@gmail.com',
        password: 'Creola Jaskolski',
        mailingAddress: '1509 Jayne Ranch Audreannechester, IN 10308',
        billingAddress: '2682 Candelario Square East Emmie, NH 62287',
        phone: '799-155-9995',
    },
    {
        name: 'Reyes Lind',
        email: 'Gudrun36@yahoo.com',
        password: 'Reyes Lind',
        mailingAddress: '29481 Grover Fort Port Deangelo, VI 46681',
        billingAddress: '6381 Bartell Course Harmonyhaven, NC 21588',
        phone: '385-551-4291',
    },
    {
        name: 'Abbie Hyatt',
        email: 'Ines_Rippin98@yahoo.com',
        password: 'Abbie Hyatt',
        mailingAddress: '63314 Rutherford Hill Angelinaton, OH 52771',
        billingAddress: '378 Dayne Throughway Shieldsland, OH 12723',
        phone: '436-964-9059',
    },
    {
        name: 'Elta Terry',
        email: 'Xavier45@gmail.com',
        password: 'Elta Terry',
        mailingAddress: '3167 Jaunita Fields Lockmanport, RI 29041',
        billingAddress: '3167 Jaunita Fields Lockmanport, RI 29041',
        phone: '433-118-2476',
    },
    {
        name: 'Peyton Rohan',
        email: 'Jasper_Spencer@yahoo.com',
        password: 'Peyton Rohan',
        mailingAddress: '987 Moriah Light New Saige, NM 92902',
        billingAddress: '987 Moriah Light New Saige, NM 92902',
        phone: '112-099-9281',
    },
    {
        name: 'Karen Bayer',
        email: 'Kassandra.Greenholt88@gmail.com',
        password: 'Damian VonRueden',
        mailingAddress: '3172 Runolfsdottir Isle Ethelfurt, RI 41456',
        billingAddress: '3172 Runolfsdottir Isle Ethelfurt, RI 41456',
        phone: '282-724-2375',
    },
];

module.exports = arrayOfUsers;
