import { FC } from 'react';
import { ThemeToggler } from '@lidofinance/lido-ui';
import RainbowButton from 'features/wallet/RainbowKit/RainbowButton';

export const HeaderWallet: FC = () => {
  return (
    <>
      <RainbowButton />
      <ThemeToggler />
    </>
  );
};
