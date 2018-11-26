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
import { validateStxAddress } from "stacks-utils";

const isValid = validateStxAddress(stx);
```

#### Stacks to Bitcoin

```jsx
import { stxToBtc } from "stacks-utils";

const btc = stxToBtc(stx);
```

#### Bitcoin to Stacks

```jsx
import { btcToStx } from "stacks-utils";

const stx = btcToStx(btc);
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


