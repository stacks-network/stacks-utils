import bigi from 'bigi';
import { SATOSHIS_IN_BTC, MICROSTACKS_IN_STACKS } from './common/constants';

/**
 * microToStacks
 */
export const microToStacks = (amountInMicroStacks: string | number) =>
  amountInMicroStacks ? Number(amountInMicroStacks) / 10 ** 6 : 0;

/**
 * stacksToMicro
 */
export const stacksToMicro = (amountInStacks: string | number) =>
  amountInStacks
    ? Math.floor(Number(amountInStacks) * MICROSTACKS_IN_STACKS)
    : 0;

/**
 * btcToSatoshis
 */
export const btcToSatoshis = (amountInBtc: string | number) =>
  amountInBtc ? Number(amountInBtc) * SATOSHIS_IN_BTC : 0;

/**
 * satoshisToBtc
 */
export const satoshisToBtc = (amountInSatoshis: string | number) =>
  amountInSatoshis ? Number(amountInSatoshis) / SATOSHIS_IN_BTC : 0;

/**
 * toBigInt
 */
export const toBigInt = (value: string | number) =>
  Number(value) < 1
    ? bigi.valueOf(Number(value) * 1000000)
    : (bigi.fromByteArrayUnsigned(value) as any).multiply(
        bigi.valueOf(1000000)
      );

export const sumUTXOs = (utxos: any[]) =>
  utxos.reduce((agg, x) => agg + x.value, 0);
