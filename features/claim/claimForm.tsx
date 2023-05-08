/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button, Select, ToastError } from '@lidofinance/lido-ui';
import { NoProgramStyled } from './styles';
import { InputGroupStyled } from 'shared/ui';
import { SelectStrategy } from 'features/vesting/selectStrategy';
import InputsGroup from 'features/vesting/inputsGroup';
import { ConnectButton } from 'features/wallet/RainbowKit/RainbowButton';
import { useAccount } from 'wagmi';
import styled from 'styled-components';
import useDaoFactory from './useDaoFactory';
import { ContractAddress, StockIndex, Strategy, StrategyModule } from 'config';
import { BigNumber } from 'ethers';
import BN from 'bignumber.js';

export const ClaimForm: FC = () => {
  const daoFactoryContract = useDaoFactory();
  const [amountTouched, setAmountTouched] = useState(false);
  const [amount] = useState('');

  const [addressTouched, setAddressTouched] = useState(false);
  const [address, setAddress] = useState('');
  const [creating, setCreating] = useState(false);

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
      if (creating) return;
      event.preventDefault();
      console.log('dao: ', daoFactoryContract);
      if (!daoFactoryContract || !account) return;
      setCreating(true);
      try {
        const stockType = BigNumber.from(1);
        const module = BigNumber.from(1);
        daoFactoryContract
          .deploy(ContractAddress.pool, 0 as any, 1 as any, {
            from: account,
          })
          .then((tx) => {
            tx.wait(1)
              .then((res) => {
                console.log('dao发布成功: ', res);
                setCreating(false);
              })
              .catch(() => {
                setCreating(false);
              });
          })
          .catch((err) => {
            console.log('DAO发布出错：', err);
            setCreating(false);
          });
      } catch (e: any) {
        console.log('catch error: ', e?.reason, JSON.stringify(e || {}));
        setCreating(false);
        const msg = e?.reason || JSON.stringify(e || {}) || 'Error';
        ToastError(msg, {
          delay: 0,
          toastId: msg,
          position: 'top-center',
        });
      }
    },
    [daoFactoryContract],
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
          loading={creating}
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
