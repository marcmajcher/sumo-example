'use strict';

/* eslint-env node */

const sumoList = [{
        id: 1,
        name: 'Akebono Tarō',
        weight: 233
    },
    {
        id: 2,
        name: 'Baruto Kaito',
        weight: 183
    },
    {
        id: 3,
        name: 'Kaiō Hiroyuki',
        weight: 179
    },
    {
        id: 4,
        name: 'Kisenosato Yutaka',
        weight: 178
    },
    {
        id: 5,
        name: 'Musashimaru Kōyō',
        weight: 235
    },
    {
        id: 6,
        name: 'Takayasu Akira',
        weight: 180
    },
];

module.exports = {
    list: new Promise((resolve) => {
        resolve(sumoList);
    })
};
