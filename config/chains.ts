import { polygon, goerli, Chain, mainnet } from '@wagmi/chains';

export const AUTO_CONNECT_CACHE_KEY = 'DAO_RAINBOWKIT';

export const PoolTestChain: Chain = {
  id: 100,
  name: 'WeshareDev',
  network: 'pool',
  rpcUrls: {
    default: { http: ['https://xjpw.weshare.farm/8545/'] },
    public: { http: ['https://xjpw.weshare.farm/8545/'] },
  },
  nativeCurrency: { ...polygon.nativeCurrency },
};

export const INITIAL_CHAIN_ID = PoolTestChain.id;
export const INITIAL_CHAIN = PoolTestChain;

export enum CHAINS {
  Mainnet = mainnet.id,
  Goerli = goerli.id,
  WeShare = PoolTestChain.id,
}

export const supportedChains = [PoolTestChain, goerli, mainnet];
export const SupportedChainIds = [PoolTestChain.id, goerli.id, mainnet.id];
