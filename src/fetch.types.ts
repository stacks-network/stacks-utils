interface BlockcypherApiTxInputResponse {
  prev_hash: string;
  output_index: string;
  script: string;
  output_value: number;
  sequence: number;
  addresses: string;
  script_type: string;
  age: number;
}

interface BlockcypherApiTxOutputResponse {
  value: number;
  script: string;
  spent_by: string;
  addresses: string[];
  script_type: string;
}

interface BlockcypherApiTxResponse {
  block_hash: string;
  block_height: number;
  block_index: number;
  hash: string;
  hex: string;
  total: number;
  fees: number;
  size: number;
  preference: string;
  relayed_by: string;
  confirmed: string;
  received: string;
  ver: number;
  double_spend: number;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  confidence: number;
  inputs: BlockcypherApiTxInputResponse[];
  outputs: BlockcypherApiTxOutputResponse[];
}

export interface BlockcypherApiResponse {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  txs: BlockcypherApiTxResponse[];
}

export interface ExplorerApiStacksAddressResponse {
  cumulativeVestedAtBlocks: number | null;
  totalUnlocked: number;
  totalUnlockedStacks: number;
  tokens: string[];
  btcAddress: string;
  address: string;
  history: {
    txid: string;
    history_id: string;
    creator_address: string | null;
    block_id: number;
    vtxindex: number;
    op: string;
    opcode: string;
    value_hash: string | null;
    history_data: string;
    historyData: {
      address: string;
      block_id: number;
      consensus_hash: string;
      op: string;
      recipient: string;
      recipient_address: string;
      scratch_area: string;
      sender: string;
      token_fee: string;
      token_units: string;
      txid: string;
      vtxindex: number;
    };
    valueStacks: string;
    value: string;
    operationType: string;
    consensusHash: string;
    tokenType: string;
    tokensSent: string;
    scratchData: string;
    recipientBitcoinAddress: string;
    recipient: string;
    tokenSentHex: string;
    senderBitcoinAddress: string;
    sender: string;
    blockTime: string;
    operation: string;
  }[];
  status: string;
  balance: string;
  vesting_total: number;
  vestingTotal: number;
  totalLocked: number;
  totalLockedStacks: number;
  tokensGranted: number;
  totalReceived: number;
  balances: {
    confirmed: number;
    unconfirmed: number;
  };
  transactions: {
    txid: string;
    history_id: string;
    creator_address: null;
    block_id: number;
    vtxindex: number;
    op: string;
    opcode: string;
    value_hash: null;
    history_data: string;
    historyData: {
      address: string;
      block_id: number;
      consensus_hash: string;
      op: string;
      recipient: string;
      recipient_address: string;
      scratch_area: string;
      sender: string;
      token_fee: string;
      token_units: string;
      txid: string;
      vtxindex: number;
    };
    valueStacks: number;
    value: number;
    operationType: string;
    consensusHash: string;
    tokenType: string;
    tokensSent: string;
    scratchData: string;
    recipientBitcoinAddress: string;
    recipient: string;
    tokenSentHex: string;
    senderBitcoinAddress: string;
    sender: string;
    blockTime: number;
    operation: string;
    tokenAmount: object;
    tokenAmountReadable: number;
    memo: string;
    fees: number;
    confirmations: number;
    block_height: number;
    block_hash: string;
    inputs: {
      prev_hash: string;
      output_index: number;
      script: string;
      output_value: number;
      sequence: number;
      addresses: string[];
      script_type: string;
      age: number;
    }[];
    outputs: {
      value: number;
      script: string;
      addresses: string[] | null;
      script_type: string;
      data_hex?: string;
    }[];
    confirmed: string;
    received: string;
    pending: boolean;
    invalid: boolean;
  };
}
