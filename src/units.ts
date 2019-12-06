import bigi from "bigi";
import { SATOSHIS_IN_BTC, MICROSTACKS_IN_STACKS } from "./common/constants";

/**
 * microToStacks
 *
 * @param {String || Number} amountInMicroStacks - the amount of microStacks to convert
 */
export const microToStacks = amountInMicroStacks =>
  amountInMicroStacks ? Number(amountInMicroStacks) / Math.pow(10, 6) : 0;

/**
 * stacksToMicro
 *
 * @param {String || Number} amountInStacks - the amount of stacks to convert
 */
export const stacksToMicro = amountInStacks =>
  amountInStacks ? Math.floor(Number(amountInStacks) * MICROSTACKS_IN_STACKS) : 0;

/**
 * btcToSatoshis
 *
 * @param {String || Number} amountInBtc - the amount of btc to convert
 */
export const btcToSatoshis = amountInBtc =>
  amountInBtc ? Number(amountInBtc) * SATOSHIS_IN_BTC : 0;

/**
 * satoshisToBtc
 *
 * @param {String || Number} amountInSatoshis - the amount of satoshis to convert
 */
export const satoshisToBtc = amountInSatoshis =>
  amountInSatoshis ? Number(amountInSatoshis) / SATOSHIS_IN_BTC : 0;

/**
 * toBigInt
 *
 * @param {String || Number} value - the value to convert to a bigint
 */
export const toBigInt = value =>
  Number(value) < 1
    ? bigi.valueOf(Number(value) * 1000000)
    : bigi.fromByteArrayUnsigned(value).multiply(bigi.valueOf(1000000));

export const sumUTXOs = utxos => utxos.reduce((agg, x) => agg + x.value, 0);

