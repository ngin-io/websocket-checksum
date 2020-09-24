
const Checksum = require('../lib/checksum.js');

test('orderbook 1', () => {
    const orderbook = {asks: [['0.3965','44149.815'],['0.3967','16000.0']], bids: [['0.396','51.0'],['0.396','25.0'],['0.3958','18570.0']]}
    //396510 396250 3958185700 396544149815 3967160000
    expect( Checksum.calculateOrderbookChecksum(orderbook)).toBe('2254383345');

    const orderbook2 = {asks: [["16015.39","0.15"],["16015.4","1.73639097"],["16015.56","2"]], bids: [["15977.45","0.00620606"],["15977.44","0.1"],["15977.4","0.35"]]}
    //1597745 620606 1597744 1 159774 35 1601539 15 160154 173639097 1601556 2
    expect( Checksum.calculateOrderbookChecksum(orderbook2)).toBe('2863372953');

    const orderbook3 = {asks: [["16015.39","0.15"]], bids: []}
    // 1601539 15
    expect( Checksum.calculateOrderbookChecksum(orderbook3)).toBe('3417282216');

    const orderbook4 = {asks: [], bids: []}
    expect( Checksum.calculateOrderbookChecksum(orderbook4)).toBe('0');

    const orderbook5 = {asks: [["0.99","1"]], bids: []}
    // 991
    expect( Checksum.calculateOrderbookChecksum(orderbook5)).toBe('2342619789');

    const orderbook6 = {bids: [['0.99', '1']], asks:  [[ '1.01', '2']]}
    // 9911012
    expect( Checksum.calculateOrderbookChecksum(orderbook6)).toBe('2111165642');

    const orderbook7 = {bids: [['10.01','1']], asks:  []}
    expect( Checksum.calculateOrderbookChecksum(orderbook7)).toBe('429948050');
    // 10011

    const orderbook8 = {bids: [], asks:  [ [ '1', '100' ], [ '2', '100' ], [ '3', '100' ] ]}
    expect( Checksum.calculateOrderbookChecksum(orderbook8)).toBe('158396744');
    // 110021003100

    const orderbook9 = {bids: [], asks:  [ [ '1', '99.9'] ]}
    expect( Checksum.calculateOrderbookChecksum(orderbook9)).toBe('334011253');
    // 1999

    const orderbook10 = {bids: [
            ["58","1.9599",2],
            ["57.45","0.01969999",1],
            ["57.39","1.88",1],
            ["57.31","1.48",1],
            ["57.29","1.07",1],
            ["57.18","0.384",1],
            ["57.14","0.345",1],
            ["57.12","0.9",9],
            ["57.1","1.72",1],
            ["56.97","4.91",1]],
        asks:  [["60","3",3],
            ["60.5","1",1],
            ["61","3",3],
            ["62","2",2],
            ["63","1",1],
            ["66","0.1",1],
            ["67","0.1",1],
            ["68","2",2],
            ["69","1",1],
            ["70","2.1",3]]};
        expect( Checksum.calculateOrderbookChecksum(orderbook10)).toBe('1666031697');
    // 5819599574519699995739188573114857291075718384571434557129571172569749160360516136226316616716826917021

});

test('trim amount has to be correct', () => {
    expect(Checksum.trimAmountPub('0.1234')).toBe("1234");
    expect(Checksum.trimAmountPub('0.00001234')).toBe("1234");
    expect(Checksum.trimAmountPub('32.00001234')).toBe("3200001234");
    expect(Checksum.trimAmountPub('0')).toBe("");
    expect(Checksum.trimAmountPub('0.0')).toBe("");
    expect(Checksum.trimAmountPub('1.0')).toBe("10");
    expect(Checksum.trimAmountPub('1.00')).toBe("100");

    expect(Checksum.trimAmountPub('0.3965')).toBe("3965");
    expect(Checksum.trimAmountPub('16000.0')).toBe("160000");
    expect(Checksum.trimAmountPub('0.0019')).toBe("19");
    expect(Checksum.trimAmountPub('')).toBe("");
    expect(Checksum.trimAmountPub('1.01')).toBe("101");

});
