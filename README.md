# Stacks Utilities

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

const tx = decodeRawTx(rawTx);
```

This will return an object as such:

```jsx
const tx = {
    opcode, // $
    operation, // TOKEN_TRANSFER
    consensusHash, // df1631913bbf485ce6a25f26bccfc8d3
    tokenType, // "STACKS"
    tokenAmount, // BigInteger
    tokenAmountReadable, // 0.00001
    memo, // Message
    recipient // recipient STX address
    recipientBitcoinAddress, // recipient BTC address
    sender, // sender STX address
    senderBitcoinAddress, // sender BTC address
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
