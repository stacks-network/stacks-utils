# Stacks Utilities

[![npm version](https://img.shields.io/bundlephobia/minzip/stacks-utils.svg)](https://npmjs.com/stacks-utils)
[![npm version](https://img.shields.io/npm/dm/stacks-utils.svg)](https://npmjs.com/stacks-utils)
[![npm version](https://img.shields.io/npm/v/stacks-utils.svg)](https://npmjs.com/stacks-utils)
[![npm license](https://img.shields.io/npm/l/stacks-utils.svg)](https://npmjs.com/stacks-utils)

## Getting started

```
npm install @blockstack/stacks-utils
# or
yarn add @blockstack/stacks-utils
```

## Table of Contents

- Addresses
- Transactions
- Hardware Wallets
- Data Fetching
- Units

## Addresses

#### Validate Stacks Address

```jsx
import { validateStacksAddress } from "@blockstack/stacks-utils";

const isValid = validateStacksAddress(stacksAddress);
```

#### Stacks to Bitcoin

```jsx
import { stacksAddressToBtcAddress } from "@blockstack/stacks-utils";

const btcAddress = stacksAddressToBtcAddress(stacksAddress);
```

#### Bitcoin to Stacks

```jsx
import { btcAddressToStacksAddress } from "@blockstack/stacks-utils";

const stacksAddress = btcAddressToStacksAddress(btcAddress);
```

## Transactions

#### Decode raw Bitcoin Transaction

```jsx
import { decodeRawTx } from "@blockstack/stacks-utils";

const fetchFees = false; // if true, the BTC fees will be fetched and calculated

async () => {
  const tx = await decodeRawTx(rawTx, fetchFees);
  console.log(tx);
};
```

This will return an object as such:

```jsx
const tx = {
  sender, // sender STX address
  senderBitcoinAddress, // sender BTC address
  recipient, // recipient STX address
  recipientBitcoinAddress, // recipient BTC address
  opcode, // $
  operation, // TOKEN_TRANSFER
  consensusHash, // df1631913bbf485ce6a25f26bccfc8d3
  tokenType, // "STACKS"
  tokenAmount, // BigInteger
  tokenAmountReadable, // 0.000001
  memo, // Message
  fees // BTC tx fees in satoshis (if fetchFees = true)
};
```

### Decode an array of transactions

This is mostly to be used in conjunction with `fetchBtcAddressData`. This will take an array of BTC transactions (with a `hex` key in each object) and decode the raw transaction and combine the two.

```jsx
import { decodeRawTxs } from "@blockstack/stacks-utils";

const fetchFees = false; // if true, the BTC fees will be fetched and calculated

(async () => {
    const txs = [...];
    const transactions = await decodeRawTx(txs, fetchFees);
    console.log(transactions)
})
```

### Get readable operation type

See: [https://docs.blockstack.org/core/wire-format.html](https://docs.blockstack.org/core/wire-format.html)

```jsx
import { getOperationType } from "@blockstack/stacks-utils";

const opcode = "$";
const operation = getOperationType(opcode); // TOKEN_TRANSFER
```

## Data Fetching

### Fetch all data associated with a Stacks Address

```jsx
import { fetchStacksAddressData } from "@blockstack/stacks-utils";

const data = await fetchStacksAddressData(stacksAddress);
```

### Fetch Stacks Address data from the Blockstack Explorer API

```jsx
import { fetchStacksAddressDetails } from "@blockstack/stacks-utils";

const data = await fetchStacksAddressDetails(stacksAddress);
```

### Fetch all data associated with a BTC Address

```jsx
import { fetchBtcAddressData } from "@blockstack/stacks-utils";

const data = await fetchBtcAddressData(btcAddress);
```

## Units

### Microstacks to Stacks

```jsx
import { microToStacks } from "@blockstack/stacks-utils";

const stacksAmount = microToStacks(1); // 0.000001
```

### Stacks to Microstacks

```jsx
import { stacksToMicro } from "@blockstack/stacks-utils";

const microStacksAmount = stacksToMicro(0.000001); // 1
```
