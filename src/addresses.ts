import { c32ToB58, b58ToC32, c32addressDecode } from "c32check";

/**
 * stacksAddressToBtcAddress
 * Wrapper for c32ToB58. Converts a Stacks address to a Bitcoin address
 *
 * @param {String} stacksAddress - the stacks address to convert
 */
export const stacksAddressToBtcAddress = stacksAddress => c32ToB58(stacksAddress);

/**
 * btcAddressToStacksAddress
 * Wrapper for b58ToC32. Converts a Bitcoin address to a Stacks address
 *
 * @param {String} btcAddress - the btc address to convert
 */
export const btcAddressToStacksAddress = btcAddress => b58ToC32(btcAddress);

/**
 * validateStacksAddress
 *
 * @param {String} stacksAddress - the STX address to validate
 */
export const validateStacksAddress = stacksAddress => {
  let valid = false;
  try {
    if (c32addressDecode(stacksAddress)) {
      valid = true;
    }
  } catch (e) {
    valid = false;
    throw new Error("Not a valid Stacks address.");
  }
  return valid;
};
