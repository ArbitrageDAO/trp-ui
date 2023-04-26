/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useVestingClaim,
  useVestingsContext,
  useVestingUnclaimed,
} from 'features/vesting';
import { validateNumericInput } from './validateNumericInput';
import { validateAddressInput } from './validateAddressInput';
import { Button, Select } from '@lidofinance/lido-ui';
import { NoProgramStyled } from './styles';
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'features/wallet';
import { useClaimingContext } from './claimingProvider';
import { InputGroupStyled } from 'shared/ui';
import { SelectStrategy } from 'features/vesting/selectStrategy';
import InputsGroup from 'features/vesting/inputsGroup';

export const ClaimForm: FC = () => {
  const { currentVesting, isLoading } = useVestingsContext();
  const { isClaiming, setIsClaiming } = useClaimingContext();

  const [amountTouched, setAmountTouched] = useState(false);
  const [amount] = useState('');

  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');

  const claim = useVestingClaim();
  const unclaimed = useVestingUnclaimed();

  const { active, account } = useWeb3();

  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) setAmountTouched(true);
  }, [amount]);
  useEffect(() => {
    if (didMountRef.current) setAddressTouched(true);
  }, [address]);

  // skipping first render
  useEffect(() => {
    didMountRef.current = true;
  }, []);

  const handleClaim: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setIsClaiming(true);

      try {
        await claim(amount, address);
      } finally {
        setIsClaiming(false);
      }
    },
    [claim, amount, setIsClaiming, address],
  );

  const { error: amountError } = validateNumericInput(amount, 'Token amount', {
    limit: unclaimed.data,
  });
  const { error: addressError } = validateAddressInput(address, {
    allowEmpty: true,
  });

  const disabled =
    amount === '' || unclaimed.loading || !!amountError || !!addressError;

  if (account != null && active && !isLoading && currentVesting == null) {
    return <NoProgramStyled>You don&apos;t have a program</NoProgramStyled>;
  }

  return (
    <form onSubmit={handleClaim}>
      <InputGroupStyled fullwidth error={null}>
        <Button size="sm" variant="translucent" color="secondary">
          Strategy
        </Button>
        <SelectStrategy />
      </InputGroupStyled>
      <InputsGroup />
      {active ? (
        <Button
          fullwidth
          loading={isClaiming}
          disabled={disabled}
          onClick={handleClaim}
        >
          Create
        </Button>
      ) : (
        <WalletConnect fullwidth />
      )}
    </form>
  );
};
