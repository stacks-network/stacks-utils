import { stacksAddressToBtcAddress } from './addresses';
import { toBigInt, sumUTXOs } from './units';
import { network, transactions, config } from 'blockstack';
import { ERRORS, PATH, WALLET_TYPES } from './common/constants';
import Transport from '@ledgerhq/hw-transport-node-hid';
import btc from 'bitcoinjs-lib';
import { TrezorSigner } from 'blockstack-trezor';
import { LedgerSigner } from 'blockstack-ledger';

/**
 * prepareTransaction
 *
 * This will generate a transaction to be fed to a hardware wallet device.
 * also useful for getting a transaction fee estimate before sending to a hardware device.
 *
 * @param {string} senderAddress - from Stacks address
 * @param {string} recipientAddress - to Stacks address
 * @param {String || Object} amount - the amount of stacks to send
 * @param {string} walletType - one of WALLET_TYPES.TREZOR or WALLET_TYPES.LEDGER
 * @param {string} memo - the message for the tx
 */

const prepareTransaction = async (
  senderAddress,
  recipientAddress,
  amount,
  walletType,
  memo = ''
) => {
  // generate our btc addresses for sender and recipient
  const senderBtcAddress = stacksAddressToBtcAddress(senderAddress);
  const recipientBtcAddress = stacksAddressToBtcAddress(recipientAddress);

  // define token type (always stacks)
  const tokenType = 'STACKS';

  const tokenAmount = toBigInt(amount); // convert to bigi

  // get an estimate
  const utxos = await config.network.getUTXOs(senderBtcAddress);
  const numUTXOs = utxos.length;

  const estimate =
    (await transactions.estimateTokenTransfer(
      recipientBtcAddress,
      tokenType,
      tokenAmount,
      memo,
      numUTXOs
    )) + 5500;

  // current BTC balance
  const btcBalance = sumUTXOs(utxos);

  // account status
  const accountStatus = await config.network.getAccountStatus(
    senderBtcAddress,
    tokenType
  );
  // current STACKS balance
  const currentAccountBalance = await config.network.getAccountBalance(
    senderBtcAddress,
    tokenType
  );

  // current Block Height
  const blockHeight = await config.network.getBlockHeight();

  // not enough btc
  if (btcBalance < estimate) {
    return {
      ...ERRORS.INSUFFICIENT_BTC_BALANCE,
      estimate,
      btcBalance,
      difference: estimate - btcBalance,
    };
  }
  // not enough stacks (should be impossible to get here)
  if (currentAccountBalance.compareTo(tokenAmount) < 0) {
    return Promise.reject(ERRORS.INSUFFICIENT_STX_BALANCE);
  }

  // not enough tokens unlocked or no unlocked tokens  (should be impossible to get here)
  if (accountStatus.lock_transfer_block_id > blockHeight) {
    return Promise.reject(ERRORS.LOCKED_TOKENS);
  }

  return {
    senderBtcAddress,
    recipientBtcAddress,
    tokenType,
    tokenAmount,
    utxos,
    numUTXOs,
    estimate,
    btcBalance,
    accountStatus,
    currentAccountBalance,
    blockHeight,
  };
};

/**
 * generateTransaction
 *
 * This will generate and sign our transaction with either a ledger or trezor
 *
 * @param {string} senderAddress - from Stacks address
 * @param {string} recipientAddress - to Stacks address
 * @param {object} amount - the amount of stacks to send
 * @param {string} walletType - one of WALLET_TYPES.TREZOR or WALLET_TYPES.LEDGER
 * @param {string} memo - the message for the tx
 */
const generateTransaction = async (
  senderAddress,
  recipientAddress,
  amount,
  walletType,
  memo = ''
) => {
  try {
    const tx = await prepareTransaction(
      senderAddress,
      recipientAddress,
      amount,
      walletType,
      memo
    );

    // if we don't have an obj from this, return generic error (should be impossible)
    if (!tx) return ERRORS.TRANSACTION_ERROR();

    // if we have an error, return it.
    if (tx.error) {
      return Promise.reject(tx);
    }

    // define our signer
    const isLedger = walletType === WALLET_TYPES.LEDGER;
    const signer = isLedger
      ? new LedgerSigner(PATH, Transport)
      : new TrezorSigner(PATH, tx.senderBtcAddress);

    // if we get here there are no errors
    const rawTx = await transactions.makeTokenTransfer(
      tx.recipientBtcAddress,
      tx.tokenType,
      tx.tokenAmount,
      memo,
      signer
    );
    return {
      fee: tx.estimate,
      rawTx,
    };
  } catch (e) {
    await Promise.reject(ERRORS.TRANSACTION_ERROR(e.message));
  }
};

/**
 * postTransaction
 *
 *
 */
const postTransaction = async rawTx => {
  const form = new FormData();
  form.append('tx', rawTx);
  return fetch(`${config.network.btc.utxoProviderUrl}/pushtx?cors=true`, {
    method: 'POST',
    body: form,
  });
};

/**
 * broadcastTransaction
 *
 * This will broadcast our transaction
 * @param {string} rawTx - the raw tx
 */

const broadcastTransaction = async rawTx => {
  try {
    const response = await postTransaction(rawTx);
    const text = await response.text();
    const success = text.toLowerCase().indexOf('transaction submitted') >= 0;
    if (success) {
      // generate tx hash
      return btc.Transaction.fromHex(rawTx)
        .getHash()
        .reverse()
        .toString('hex'); // big_endian
    } else {
      await Promise.reject(
        `Broadcast transaction failed with message: ${text}`
      );
    }
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export {
  prepareTransaction,
  generateTransaction,
  postTransaction,
  broadcastTransaction,
};
