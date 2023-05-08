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
import { InputGroupStyled } from 'shared/ui';
import { SelectStrategy } from 'features/vesting/selectStrategy';
import InputsGroup from 'features/vesting/inputsGroup';
import { ConnectButton } from 'features/wallet/RainbowKit/RainbowButton';
import { useAccount } from 'wagmi';
import styled from 'styled-components';

export const ClaimForm: FC = () => {
  const [amountTouched, setAmountTouched] = useState(false);
  const [amount] = useState('');

  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');

  const { address: account } = useAccount();

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
      {account ? (
        <Button
          fullwidth
          loading={false}
          // disabled={disabled}
          onClick={handleClaim}
        >
          Create
        </Button>
      ) : (
        <ConnectButton />
      )}
    </form>
  );
};
