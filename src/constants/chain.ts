import akashImg from '~/images/symbols/akash.png';
import certikImg from '~/images/symbols/certik.png';
import cosmosImg from '~/images/symbols/cosmos.png';
import cryptocomImg from '~/images/symbols/cryptocom.png';
import ethereumImg from '~/images/symbols/ethereum.png';
import irisImg from '~/images/symbols/iris.png';
import kavaImg from '~/images/symbols/kava.png';
import persistenceImg from '~/images/symbols/persistence.png';
import sentinelImg from '~/images/symbols/sentinel.png';
import sifImg from '~/images/symbols/sif.png';
import type { EthereumChain, EthereumNetwork, TendermintChain } from '~/types/chain';

export const LINE_TYPE = {
  TENDERMINT: 'TENDERMINT',
  ETHEREUM: 'ETHEREUM',
} as const;

export const MINTSCAN_URL = 'https://www.mintscan.io';

export const TENDERMINT_CHAINS: TendermintChain[] = [
  {
    id: '62a8e13a-3107-40ef-ade4-58de45aa6c1f',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'cosmoshub-4',
    chainName: 'cosmos',
    restURL: 'https://lcd-cosmos.cosmostation.io',
    imageURL: cosmosImg,
    baseDenom: 'uatom',
    displayDenom: 'atom',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'cosmos' },
    coinGeckoId: 'cosmos',
    explorerURL: `${MINTSCAN_URL}/cosmos`,
  },
  {
    id: 'd86e2b4e-e422-4b58-b687-f1de03cde152',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'irishub-1',
    chainName: 'iris',
    restURL: 'https://lcd-iris.cosmostation.io',
    imageURL: irisImg,
    baseDenom: 'uiris',
    displayDenom: 'iris',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'iaa' },
    coinGeckoId: 'iris-network',
    explorerURL: `${MINTSCAN_URL}/iris`,
  },
  {
    id: '634e5e88-0a26-4ef5-92b5-dbf4cf040a8a',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'kava-9',
    chainName: 'kava',
    restURL: 'https://lcd-kava.cosmostation.io',
    imageURL: kavaImg,
    baseDenom: 'ukava',
    displayDenom: 'kava',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'kava' },
    coinGeckoId: 'kava',
    explorerURL: `${MINTSCAN_URL}/kava`,
  },
  {
    id: 'c3e5474b-8cf7-467e-b6a8-706d2b694e5a',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'laozi-mainnet',
    chainName: 'band',
    restURL: 'https://lcd-band.cosmostation.io',
    baseDenom: 'uband',
    displayDenom: 'band',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "494'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'band' },
    coinGeckoId: 'band-protocol',
    explorerURL: `${MINTSCAN_URL}/band`,
  },
  {
    id: 'b869bcf8-f489-443a-9be4-56cac21f6f53',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'akashnet-2',
    chainName: 'akash',
    restURL: 'https://lcd-akash.cosmostation.io',
    imageURL: akashImg,
    baseDenom: 'uakt',
    displayDenom: 'akt',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'akash' },
    coinGeckoId: 'akash-network',
    explorerURL: `${MINTSCAN_URL}/akash`,
  },
  {
    id: '29d61a8d-6bbe-4524-afa5-6f70931bcdee',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'shentu-2.2',
    chainName: 'certik',
    restURL: 'https://lcd-certik.cosmostation.io',
    imageURL: certikImg,
    baseDenom: 'uctk',
    displayDenom: 'ctk',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'certik' },
    coinGeckoId: 'certik',
    explorerURL: `${MINTSCAN_URL}/certik`,
  },
  {
    id: '8c72318f-8279-4d37-a457-1cd4c0b1f160',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'sentinelhub-2',
    chainName: 'sentinel',
    restURL: 'https://lcd-sentinel.cosmostation.io',
    imageURL: sentinelImg,
    baseDenom: 'udvpn',
    displayDenom: 'DVPN',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'sent' },
    coinGeckoId: 'sentinel-group',
    explorerURL: `${MINTSCAN_URL}/sentinel`,
  },
  {
    id: '58c55107-2df3-4851-a68e-fee203308be2',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'core-1',
    chainName: 'persistence',
    restURL: 'https://lcd-persistence.cosmostation.io',
    imageURL: persistenceImg,
    baseDenom: 'uxprt',
    displayDenom: 'xprt',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "750'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'persistence' },
    coinGeckoId: 'persistence',
    explorerURL: `${MINTSCAN_URL}/persistence`,
  },
  {
    id: '3b8e015e-ab6c-4095-9dd8-57e62f437f4f',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'fetchhub-2',
    chainName: 'fetch.ai',
    restURL: 'https://lcd-fetchai.cosmostation.io',
    baseDenom: 'afet',
    displayDenom: 'fet',
    decimals: 18,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'fetch' },
    coinGeckoId: 'fetch-ai',
    explorerURL: `${MINTSCAN_URL}/fetchai`,
  },
  {
    id: 'ba43a35a-0861-486a-9ce9-c23fb1ba610c',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'sifchain-1',
    chainName: 'sifchain',
    restURL: 'https://lcd-sifchain.cosmostation.io',
    imageURL: sifImg,
    baseDenom: 'rowan',
    displayDenom: 'rowan',
    decimals: 18,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'sif' },
    coinGeckoId: 'sifchain',
    explorerURL: `${MINTSCAN_URL}/sifchain`,
  },
  {
    id: 'b006dccc-ff1e-4c5a-95ad-94f313029d93',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'crypto-org-chain-mainnet-1',
    chainName: 'crypto.org',
    restURL: 'https://lcd-cryptocom.cosmostation.io',
    imageURL: cryptocomImg,
    baseDenom: 'basecro',
    displayDenom: 'cro',
    decimals: 8,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'cro' },
    coinGeckoId: 'crypto-com-chain',
    explorerURL: `${MINTSCAN_URL}/crypto-org`,
  },
  {
    id: 'f850280f-316c-44ab-9624-c8d760dbca8c',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'kichain-2',
    chainName: 'kichain',
    restURL: 'https://lcd-kichain.cosmostation.io',
    baseDenom: 'uxki',
    displayDenom: 'xki',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'ki' },
    coinGeckoId: 'ki',
    explorerURL: `${MINTSCAN_URL}/ki-chain`,
  },
  {
    id: '320cfa03-401d-44b5-a40a-0de7c0d705eb',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'iov-mainnet-ibc',
    chainName: 'starname',
    restURL: 'https://lcd-iov.cosmostation.io',
    baseDenom: 'uiov',
    displayDenom: 'iov',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "234'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'star' },
    coinGeckoId: 'starname',
    explorerURL: `${MINTSCAN_URL}/starname`,
  },
  {
    id: '1272070c-b1f0-455e-9bb7-ff434b5011e9',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'panacea-3',
    chainName: 'medibloc',
    restURL: 'https://lcd-medibloc.cosmostation.io',
    baseDenom: 'umed',
    displayDenom: 'med',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'panacea' },
    coinGeckoId: 'medibloc',
    explorerURL: `${MINTSCAN_URL}/medibloc`,
  },
  {
    id: 'b6b1f158-9d6c-4779-a40d-9be657555612',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'emoney-3',
    chainName: 'emoney',
    restURL: 'https://lcd-emoney.cosmostation.io',
    baseDenom: 'ungm',
    displayDenom: 'ngm',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'emoney' },
    coinGeckoId: 'e-money',
    explorerURL: `${MINTSCAN_URL}/emoney`,
  },
  {
    id: '2be3f1c4-8c2e-4fc9-80c8-5877b0bb77c8',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'titan-1',
    chainName: 'rizon',
    restURL: 'https://lcd-rizon.cosmostation.io',
    baseDenom: 'uatolo',
    displayDenom: 'atolo',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'rizon' },
    coinGeckoId: 'hdac',
    explorerURL: `${MINTSCAN_URL}/rizon`,
  },
  {
    id: '23076a4e-8bba-4e36-8563-2c30948f290c',
    line: LINE_TYPE.TENDERMINT,
    chainId: 'juno-1',
    chainName: 'juno',
    restURL: 'https://lcd-juno.cosmostation.io',
    baseDenom: 'ujuno',
    displayDenom: 'juno',
    decimals: 6,
    bip44: {
      purpose: "44'",
      coinType: "118'",
      account: "0'",
      change: '0',
    },
    bech32Prefix: { address: 'juno' },
    coinGeckoId: 'juno-network',
    explorerURL: `${MINTSCAN_URL}/juno`,
  },
];

export const ETHEREUM_CHAINS: EthereumChain[] = [
  {
    id: '33c328b1-2d5f-43f1-ac88-25be1a5abf6c',
    chainName: 'ethereum',
    imageURL: ethereumImg,
    line: LINE_TYPE.ETHEREUM,
    bip44: {
      purpose: "44'",
      coinType: "60'",
      account: "0'",
      change: '0',
    },
  },
];

export const ETHEREUM_NETWORKS: EthereumNetwork[] = [
  {
    id: '63c2c3dd-7ab1-47d7-9ec8-c70c64729cc6',
    ethereumChainId: '33c328b1-2d5f-43f1-ac88-25be1a5abf6c',
    chainId: '1',
    networkName: 'mainnet',
    // rpcURL: 'http://61.74.179.193:50001',
    rpcURL: 'https://api.mycryptoapi.com/eth',
    imageURL: ethereumImg,
    baseDenom: 'weth',
    displayDenom: 'eth',
    decimals: 18,
    explorerURL: 'https://etherscan.io',
    coinGeckoId: 'ethereum',
  },
];

export const CHAINS = [...ETHEREUM_CHAINS, ...TENDERMINT_CHAINS];
