/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { validateNumericInput } from './validateNumericInput';
import { validateAddressInput } from './validateAddressInput';
import { Button, Select } from '@lidofinance/lido-ui';
import { NoProgramStyled } from './styles';
import { useWeb3 } from 'reef-knot';
import { InputGroupStyled } from 'shared/ui';
import { SelectStrategy } from 'features/vesting/selectStrategy';
import InputsGroup from 'features/vesting/inputsGroup';
import RainbowButton from 'features/wallet/RainbowKit/RainbowButton';

export const ClaimForm: FC = () => {
  const [amountTouched, setAmountTouched] = useState(false);
  const [amount] = useState('');

  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');

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
      // setIsClaiming(true);
    },
    [address],
  );

  // const { error: amountError } = validateNumericInput(amount, 'Token amount', {
  //   limit: unclaimed.data,
  // });
  // const { error: addressError } = validateAddressInput(address, {
  //   allowEmpty: true,
  // });

  // if (account != null && active && !isLoading && currentVesting == null) {
  //   return <NoProgramStyled>You don&apos;t have a program</NoProgramStyled>;
  // }

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
          loading={false}
          // disabled={disabled}
          onClick={handleClaim}
        >
          Create
        </Button>
      ) : (
        <RainbowButton />
      )}
    </form>
  );
};
