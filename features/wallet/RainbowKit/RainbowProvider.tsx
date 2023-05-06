import React, { useEffect } from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  supportedChains,
  AUTO_CONNECT_CACHE_KEY,
  INITIAL_CHAIN_ID,
} from 'config/chains';

require('@rainbow-me/rainbowkit/styles.css');

const { chains, provider } = configureChains(
  // [PoolTestChain],
  supportedChains,
  [publicProvider()],
  {
    pollingInterval: 20000,
    stallTimeout: 20000,
  },
);

export const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const theme = lightTheme({
  accentColor: '#00B459',
  accentColorForeground: '#E0F6EB',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
});

const RainBowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const autoChache = localStorage.getItem(AUTO_CONNECT_CACHE_KEY);
    // setAutoConnect(autoChache === '0')
    if (autoChache === '1') {
      // connect()
    }
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        // chains={[PoolTestChain]}
        chains={supportedChains}
        modalSize="compact"
        initialChain={INITIAL_CHAIN_ID}
        // initialChain={PoolTestChain.id}
        theme={theme}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainBowProvider;
