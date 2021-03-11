const fs = require('fs');
const path = require('path');

const M_TYPES = [
    'OutOfStockRemoval',
    'SomethingElse',
    'PriceChanged'
];

function makeMessage() {    
    return JSON.stringify({
        type: M_TYPES[Math.round(Math.random() * (M_TYPES.length - 1))],
        data: {
            sku: `${Math.round(Math.random() * 100)}`,
            product: Math.round(Math.random() * 5) === 1 ? readFixture('lineItem') : 'changeNotRelatedToProduct',
        }
    })
}

function _rstring(length) {
    return (Math.random().toString(length || 36)+'00000000000000000')
}

module.exports = {
    makeMessage,
}

function readFixture(name) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, `fixtures/${name}.json`)).toString());
}
