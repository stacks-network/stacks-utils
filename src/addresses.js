import { c32ToB58, b58ToC32, c32addressDecode } from "c32check";

/**
 * stxToBtc
 * Wrapper for c32ToB58. Converts a Stacks address to a Bitcoin address
 *
 * @param {String} stx - the stacks address to convert
 */
const stxToBtc = stx => c32ToB58(stx);

/**
 * btcToStx
 * Wrapper for b58ToC32. Converts a Bitcoin address to a Stacks address
 *
 * @param {String} btc - the btc address to convert
 */
const btcToStx = btc => b58ToC32(btc);

/**
 * validateStxAddress
 *
 * @param {String} address - the STX address to validate
 */
const validateStxAddress = address => {
  let valid = false;
  try {
    if (c32addressDecode(address)) {
      valid = true;
    }
  } catch (e) {
    valid = false;
  }
  return valid;
};

export { stxToBtc, btcToStx, validateStxAddress };
