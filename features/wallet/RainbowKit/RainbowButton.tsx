import React, { useEffect } from 'react';
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import styled from 'styled-components';
import { SupportedChainIds, AUTO_CONNECT_CACHE_KEY } from 'config/chains';

export default function RainbowKitProvider() {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { address: account } = useAccount({
    onDisconnect() {
      // ...
    },
    onConnect() {
      // ...
    },
  });

  useDisconnect({
    onMutate() {
      console.log('disconnect mounted: ', account);
    },
    onError(error) {
      console.log('ERROR=> ', error);
    },
  });
  useEffect(() => {
    console.log('address----------change --------> ', account);
    if (!account) {
      localStorage.setItem(AUTO_CONNECT_CACHE_KEY, '0');
      // disconnect()
    } else {
      localStorage.setItem(AUTO_CONNECT_CACHE_KEY, '1');
      // connect
    }
  }, [account, chain]);

  useEffect(() => {
    if (
      account &&
      chain?.id &&
      !SupportedChainIds.includes(chain.id) &&
      openChainModal
    ) {
      openChainModal();
    }
  }, [chain, openChainModal, account]);

  return (
    <Wrapper>
      <ConnectButton showBalance={false} chainStatus="full" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  button[aria-label='Chain Selector'] {
    display: none;
  }
`;
