import type { LINE_TYPE } from '~/constants/chain';

export type LineType = ValueOf<typeof LINE_TYPE>;

export type BIP44 = {
  purpose: string;
  coinType: string;
  account: string;
  change: string;
  addressIndex: string;
};

type CommonChain = {
  id: string;
  bip44: Omit<BIP44, 'addressIndex'>;
  imageURL?: string;
};

export type TendermintChain = {
  line: typeof LINE_TYPE.TENDERMINT;
  chainId: string;
  chainName: string;
  baseDenom: string;
  displayDenom: string;
  restURL: string;
  decimals: number;
  bech32Prefix: {
    address: string;
  };
  coinGeckoId?: string;
  explorerURL?: string;
} & CommonChain;

export type EthereumChain = {
  line: typeof LINE_TYPE.ETHEREUM;
  chainName: string;
} & CommonChain;

export type EthereumNetwork = {
  id: string;
  ethereumChainId: string;
  chainId: string;
  networkName: string;
  baseDenom: string;
  displayDenom: string;
  decimals: number;
  rpcURL: string;
  imageURL?: string;
  explorerURL?: string;
  coinGeckoId?: string;
};

export type EthereumToken = {
  id: string;
  accountId: string;
  ethereumNetworkId: string;
  address: string;
  tokenName: string;
  decimals: number;
  imageURL?: string;
};

export type Chain = TendermintChain | EthereumChain;