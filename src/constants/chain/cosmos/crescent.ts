import { MINTSCAN_URL } from '~/constants/common';
import crescentChainImg from '~/images/chainImgs/cresent.png';
import crescentTokenImg from '~/images/symbols/cre.png';
import type { CosmosChain } from '~/types/chain';

export const CRESCENT: CosmosChain = {
  id: 'c4c9e553-24a2-487d-a3a9-106b0f70b4ce',
  line: 'COSMOS',
  type: '',
  chainId: 'crescent-1',
  chainName: 'CRESCENT',
  restURL: 'https://lcd-crescent.cosmostation.io',
  tokenImageURL: crescentTokenImg,
  imageURL: crescentChainImg,
  baseDenom: 'ucre',
  displayDenom: 'CRE',
  decimals: 6,
  bip44: {
    purpose: "44'",
    coinType: "118'",
    account: "0'",
    change: '0',
  },
  bech32Prefix: { address: 'cre' },
  coinGeckoId: 'crescent-network',
  explorerURL: `${MINTSCAN_URL}/crescent`,
  gasRate: {
    tiny: '0.01',
    low: '0.02',
    average: '0.1',
  },
  gas: { send: '100000' },
};
