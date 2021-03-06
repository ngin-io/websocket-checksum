const { crc32 } = require('crc');

// calculates checksum for a given orderbook event
exports.calculateOrderbookChecksum = function (orderbook) {
    var bids = concatenateOrders(orderbook.bids);
    var asks = concatenateOrders(orderbook.asks);
    const result =  crc32(bids + asks).toString(10);
    return  result;
}

// order format is [price, volume, count] count is not used for checksum validation
function concatenateOrders(orders) {
    var str = '';
    const maxItem = Math.min(orders.length, 10);
    for (var i=0; i<maxItem;i++) {
        const price = orders[i][0];
        const volume = orders[i][1];
        str += trimAmount(price) + trimAmount(volume);
    }
    return str;
}

// made public for testing
exports.trimAmountPub = function (amount) {
    return trimAmount(amount);
}

function trimAmount(amount) {
    return amount.replace('.', '').replace(/^0+/, '');
}
