import React, { useEffect } from 'react';
import {
  ConnectButton as RainbowBTN,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import styled from 'styled-components';
import { SupportedChainIds, AUTO_CONNECT_CACHE_KEY } from 'config/chains';

type Props = {
  chainSelector?: boolean;
  showBalance?: boolean;
  style?: React.CSSProperties;
};

export default function RainbowButton({
  chainSelector = false,
  showBalance = false,
  style,
}: Props) {
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
    <Wrapper
      chainSelector={chainSelector ? '1' : '0'}
      account={account ?? ''}
      style={style}
    >
      <RainbowBTN showBalance={showBalance} chainStatus="full" />
    </Wrapper>
  );
}

export const ConnectButton = () => {
  return (
    <ConnectWrapper>
      <RainbowButton />
    </ConnectWrapper>
  );
};

const Wrapper = styled.div<{ chainSelector: string; account: string }>`
  border-radius: 10px;
  width: 100%;
  button[aria-label='Chain Selector'] {
    display: ${({ chainSelector }) =>
      chainSelector === '1' ? 'flex' : 'none'};
  }
  button {
    width: ${({ chainSelector }) => (chainSelector ? 'auto' : '100%')};
    text-align: center !important;
    :hover {
      scale: 1 !important;
    }
    &,
    & > div {
      background: ${({ account }) =>
        account ? '#fff !important' : 'transparent'};
    }
  }
`;

const ConnectWrapper = styled.div`
  button {
    height: 50px !important;
    font-size: 14px !important;
  }
`;
