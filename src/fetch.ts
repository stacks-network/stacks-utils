import { decodeRawTxs } from './transactions';
import { stacksAddressToBtcAddress } from './addresses';
import { API_URL } from './common/constants';
import { fetchJSON } from './common/lib';
import {
  BlockcypherApiResponse,
  ExplorerApiStacksAddressResponse,
} from './fetch.types';

/**
 * fetchStacksAddressDetails
 *
 * Fetches data for a given Stacks address from the Blockstack Explorer API.
 * Contains data about allocations and confirmed Stacks transactions.
 *
 */
export const fetchStacksAddressDetails = async (address: string) => {
  let data = null;
  // put this in a try/catch because fresh addresses return 404 from the blockstack api
  // and we want to continue because the btc tx will show pending stacks txs
  try {
    data = await fetchJSON(`${API_URL}/api/stacks/addresses/${address}`);
  } catch (e) {
    data = null;
  }
  return data;
};

/**
 * fetchBtcAddressData
 *
 * This fetches data for a given BTC address from BlockCypher
 *
 * TODO: for accounts with 50+ transactions, we'll have to paginate
 */
export const fetchBtcAddressData = async (
  btcAddress: string
): Promise<BlockcypherApiResponse> => {
  try {
    const response = await fetch(
      `https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}/full?includeHex=true&limit=50`
    );
    return response.json();
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * fetchStacksAddressData
 *
 * This will fetch data from the Blockstack Explorer API, along with fetching
 * BTC transaction data for the given Stacks address. The BTC tx data will allow us
 * to gather information about pending/invalid Stacks transactions.
 */
export const fetchStacksAddressData = async (
  stacksAddress: string
): Promise<ExplorerApiStacksAddressResponse> => {
  const btcAddress = stacksAddressToBtcAddress(stacksAddress);

  // fetch data from blockcypher and from the blockstack explorer api
  const promises = await Promise.all([
    fetchBtcAddressData(btcAddress),
    fetchStacksAddressDetails(stacksAddress),
  ]);
  const btcData = promises[0];
  const data = promises[1];

  // this is generally the source of truth if there are any kind of stacks transactions
  // if there is no BTC tx history, there will not be any Stacks transactions, pending or otherwise
  const txs = btcData && btcData.txs && btcData.txs.length ? btcData.txs : [];

  // decode the raw tx to get at the stacks data
  const transactionsWithStacksData = await decodeRawTxs(txs, false);

  // determine if the stacks transaction is valid or not (accepted by Blockstack Core)
  const transactionsWithStacksDataWithInvalidState = transactionsWithStacksData.map(
    (tx: any) => ({
      ...tx,
      invalid:
        Number(tx.confirmations) >= 7 &&
        data &&
        data.history &&
        !data.history.find((historical: any) => historical.txid === tx.txid), // if this is true, and has 7+ confirmations, it's an invalid stacks tx
    })
  );

  // merge the decoded and modified BTC transactions with
  // the historical items from the blockstack explorer api
  const transactions = transactionsWithStacksDataWithInvalidState.map(
    (thisTx: any) => {
      const additionalData =
        (data &&
          data.history &&
          data.history.find(
            (historicalTx: any) =>
              historicalTx && historicalTx.txid === thisTx.txid
          )) ||
        {};
      return {
        ...additionalData,
        ...thisTx,
      };
    }
  );

  return {
    ...data,
    balances: {
      confirmed: btcData.balance,
      unconfimed: btcData.unconfirmed_balance,
    },
    transactions,
  };
};
