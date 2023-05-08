import { Divider } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import {
  WalletCardRow,
  WalletCardComponent,
  FallbackWallet,
} from 'features/wallet';
// import { WalletLocked } from './wallet-locked';
// import { WalletPeriod } from './wallet-period';
import { WalletCardStyled } from './wallet.style';

const WalletComponent: WalletCardComponent = (props) => {
  return (
    <WalletCardStyled {...props}>
      <WalletCardRow>
        {/* {currentVesting && <WalletLocked />}
        {currentVesting && <WalletVesting vestingAddress={currentVesting} />} */}
      </WalletCardRow>
      <Divider />
      <WalletCardRow>
        {/* {currentVesting && <WalletUnclaimed />}
        {currentVesting && <WalletPeriod />} */}
      </WalletCardRow>
    </WalletCardStyled>
  );
};

export const Wallet: WalletCardComponent = (props) => {
  const { active } = useWeb3();
  return active ? (
    <WalletComponent {...props} />
  ) : (
    <FallbackWallet {...props} />
  );
};
