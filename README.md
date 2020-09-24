# websocket-checksum

This repository can be used as a guide to generate checksum for `orderbookUpdate` events. It's importnnt that the checksum is generated the same way so it can be used as a reliable data that can be compared with the checksum number received from `orderbookUpdate` event 


Assuming an orderbook arrives as per below sample:
```
{ marketId: 'BTC-AUD',
    timestamp: '"2020-01-08T19:47:24.054Z',
    snapshotId: 1578512844045000,
    bids:  [ ['99.81', '1.2', 1 ], ['95.8', '0', 0 ]],
    asks: [ ['100', '3.2', 2 ] ],
    messageType: 'orderbookUpdate'
  }
```

Then following algorithm can be usd to generate a checksum:

## Checksum algorithm
* Algoritm to calculate:
* start with top 10 Bid orders (or less if there is less than 10)
* for every price and volume:
* remove "."
* remove leading zeros
* concatenate price + volume as a string
* add above for all orders in top 10 bids (based on highest bid to lowest bid price). if there are less than 10 orders then uer whatever is there.
* repeat above for top 10 Ask orders
* concatenate result of bids and asks
* calculate checksum for the string
* if your CRC32 library produces leading zero then remove it from the result before comparing 
* checksum zero means there are no bids/asks in the orderbook (unlikely)
