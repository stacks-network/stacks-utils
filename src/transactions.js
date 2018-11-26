import btc from "bitcoinjs-lib";
import bigi from "bigi";
import { b58ToC32 } from "c32check";
import { microToStacks } from "./units";

/**
 * getOperationType
 *
 * Returns a readable operation type
 * see: https://docs.blockstack.org/core/wire-format.html
 *
 * @param {String} opCode - the ascii character
 */
const getOperationType = opCode => {
  if (opCode === "$") {
    return "TOKEN_TRANSFER";
  }
  if (opCode === "?") {
    return "NAME_PREORDER";
  }
  if (opCode === ":") {
    return "NAME_REGISTRATION";
  }
  if (opCode === "+") {
    return "NAME_UPDATE";
  }
  if (opCode === ">") {
    return "NAME_TRANSFER";
  }
  if (opCode === "~") {
    return "NAME_REVOKE";
  }
  if (opCode === "#") {
    return "ANNOUNCE";
  }
  if (opCode === "*") {
    return "NAMESPACE_PREORDER";
  }
  if (opCode === "&") {
    return "NAMESPACE_REVEAL";
  }
  if (opCode === ";") {
    return "NAME_IMPORT";
  }
  if (opCode === "!") {
    return "NAMESPACE_READY";
  }
  return null;
};

/**
 * decodeRawTx
 *
 * This will decode a raw Bitcoin hex transaction
 * and provide stacks transaction information.
 *
 * @param {String} rawTx - the hex tx to decode
 */
const decodeRawTx = rawTx => {
  const tx = btc.Transaction.fromHex(rawTx);
  const data = btc.script.decompile(tx.outs[0].script)[1];
  if (!data.slice) {
    return;
  }
  const operationType = data.slice(2, 3).toString();
  const consensusHash = data.slice(3, 19).toString("hex");

  const tokenTypeHex = data.slice(19, 38).toString("hex");
  const tokenTypeStart = tokenTypeHex.search(/[1-9]/);

  const tokenType = Buffer.from(
    tokenTypeHex.slice(tokenTypeStart - (tokenTypeStart % 2)),
    "hex"
  ).toString();

  const tokenSentHex = data.slice(38, 46).toString("hex");
  const tokenSentBigI = bigi.fromHex(tokenSentHex);

  const scratchData = data.slice(46, 80).toString();

  const recipientBitcoinAddress = btc.address.fromOutputScript(
    tx.outs[1].script
  );
  const recipientC32Address = b58ToC32(recipientBitcoinAddress);

  const inputData = btc.script.decompile(tx.ins[0].script);
  const hash = btc.crypto.hash160(inputData[inputData.length - 1]);
  const isPubKey = btc.script.isCanonicalPubKey(
    inputData[inputData.length - 1]
  );
  const version = isPubKey
    ? btc.networks.bitcoin.pubKeyHash
    : btc.networks.bitcoin.scriptHash;
  const senderBitcoinAddress = btc.address.toBase58Check(hash, version);
  const senderStacksAddress = b58ToC32(senderBitcoinAddress);

  return {
    sender: senderStacksAddress,
    senderBitcoinAddress,
    recipient: recipientC32Address,
    recipientBitcoinAddress,
    opcode: operationType,
    operation: getOperationType(operationType),
    consensusHash,
    tokenType,
    tokenAmount: tokenSentBigI,
    tokenAmountReadable: microToStacks(tokenSentBigI.toString()),
    memo: scratchData
  };
};

export { decodeRawTx };
