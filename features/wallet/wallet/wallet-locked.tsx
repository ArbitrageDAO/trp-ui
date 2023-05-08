import { FC } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
// import { FormatToken } from 'shared/ui/formatToken';
import { WalletCardBalance } from 'features/wallet';
import { TokenToWallet } from './token-to-wallet';

export const WalletLocked: FC = () => {
  return (
    <WalletCardBalance
      title={
        <>
          Locked{' '}
          <Tooltip
            placement="bottom"
            title="Amount of the tokens currently locked in the escrow and not yet available for claim"
          >
            <Question />
          </Tooltip>
        </>
      }
      loading={false}
      value={
        <>
          {/* <FormatToken amount={} symbol={symbol} /> */}
          <TokenToWallet address={'address'} />
        </>
      }
    />
  );
};
