# Stacks Utilities
[![npm version](https://img.shields.io/bundlephobia/minzip/stacks-utils.svg)](https://npmjs.com/stacks-utils)
[![npm version](https://img.shields.io/npm/dm/stacks-utils.svg)](https://npmjs.com/stacks-utils)
[![npm version](https://img.shields.io/npm/v/stacks-utils.svg)](https://npmjs.com/stacks-utils)
[![npm license](https://img.shields.io/npm/l/stacks-utils.svg)](https://npmjs.com/stacks-utils)
## Getting started

```
npm install stacks-utils
# or
yarn add stacks-utils
```

## Addresses

#### Validate Stacks Address

```jsx
import { validateStacksAddress } from "stacks-utils";

const isValid = validateStacksAddress(stacksAddress);
```

#### Stacks to Bitcoin

```jsx
import { stacksToBtc } from "stacks-utils";

const btcAddress = stacksToBtc(stacksAddress);
```

#### Bitcoin to Stacks

```jsx
import { btcToStacks } from "stacks-utils";

const stacksAddress = btcToStacks(btcAddress);
```

## Transactions

#### Decode raw Bitcoin Transaction

```jsx
import { decodeRawTx } from "stacks-utils";

(async () => {
    const tx = await decodeRawTx(rawTx);
    console.log(tx)
})
```

This will return an object as such:

```jsx
const tx = {
    sender,                     // sender STX address
    senderBitcoinAddress,       // sender BTC address
    recipient,                  // recipient STX address
    recipientBitcoinAddress,    // recipient BTC address
    opcode,                     // $
    operation,                  // TOKEN_TRANSFER
    consensusHash,              // df1631913bbf485ce6a25f26bccfc8d3
    tokenType,                  // "STACKS"
    tokenAmount,                // BigInteger
    tokenAmountReadable,        // 0.000001
    memo,                       // Message
    fees                        // BTC tx fees in satoshis
};
```

## Units

### Microstacks to Stacks

```jsx
import { microToStacks } from "stacks-utils";

const stacksAmount = microToStacks(1); // 0.000001
```

### Stacks to Microstacks

```jsx
import { stacksToMicro } from "stacks-utils";

const microStacksAmount = stacksToMicro(0.000001); // 1
```
