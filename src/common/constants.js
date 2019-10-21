/**
 * Units
 */
const SATOSHIS_IN_BTC = 100000000;
const MICROSTACKS_IN_STACKS = 1000000;

/**
 *
 */
const PATH = `m/44'/5757'/0'/0/0`;
const UTXO_SERVICE_URI = "https://utxo.blockstack.org";

/**
 * Errors
 */
const ERRORS = {
  // not enough btc for fees
  INSUFFICIENT_BTC_BALANCE: {
    error: true,
    type: "INSUFFICIENT_BTC_BALANCE",
    message: "Insufficient Bitcoin balance to fund transaction fees."
  },
  PENDING_CONFIRMATIONS: {
    error: true,
    type: "PENDING_CONFIRMATIONS",
    message: "Your BTC is still being confirmed. Please try again later."
  },
  // not enough stx to send
  INSUFFICIENT_STX_BALANCE: {
    error: true,
    type: "INSUFFICIENT_STX_BALANCE",
    message: "Insufficient Stacks balance."
  },
  // locked tokens error
  LOCKED_TOKENS: {
    error: true,
    type: "LOCKED_TOKENS",
    message:
      "Token transfer cannot be safely sent. Tokens have not been unlocked."
  },
  // generic error
  TRANSACTION_ERROR: (message = "Token transfer cannot be safely sent.") => ({
    error: true,
    type: "TRANSACTION_ERROR",
    message
  })
};

const WALLET_TYPES = {
  WATCH_ONLY: "wallet_types/WATCH_ONLY",
  LEDGER: "wallet_types/LEDGER",
  TREZOR: "wallet_types/TREZOR"
};

/**
 * URLS
 */
const API_URL = "https://explorer-api.blockstack.org";

export {
  SATOSHIS_IN_BTC,
  MICROSTACKS_IN_STACKS,
  PATH,
  UTXO_SERVICE_URI,
  ERRORS,
  WALLET_TYPES,
  API_URL
};
