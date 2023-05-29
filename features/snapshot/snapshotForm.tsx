/* eslint-disable react-hooks/exhaustive-deps */
import { Block, Button, Checkbox } from '@lidofinance/lido-ui';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
import { Form } from './snapshotFormStyles';
import SelectParticipation from 'features/vesting/selectParticipation';
import { useAccount } from 'wagmi';
import { ConnectButton } from 'features/wallet/RainbowKit/RainbowButton';
import InputsGroup from 'features/vesting/inputsGroup';
import type { Address } from 'wagmi';
import { PartiOptions, TOKENS, StockIndex } from 'config';
import useQueryDaoList from 'features/hooks/useQueryDaoList';

type SnapshotFormData = {
  delegateAddress: string;
};

const partiOptions = [
  PartiOptions.PARTICIPATION,
  PartiOptions.NON_PARTICIPATION,
];

export default function SnapshotForm() {
  const { address: account } = useAccount();
  const [curParti, setCurParti] = useState<PartiOptions>(
    PartiOptions.PARTICIPATION,
  );
  const { loading, refetch, myDaoList, daoList } = useQueryDaoList();
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [selectedCoin, setSelectedCoin] = useState<TOKENS>(TOKENS.BTC);
  const [stockType, setStockType] = useState<StockIndex>(StockIndex.SHORT);
  const [curAddress, setCurAddress] = useState<Address>();
  const [list, setList] = useState<Address[]>();

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const runTransaction = (data: SnapshotFormData) => {
    console.log('submit: ', data);
  };

  useEffect(() => {
    refetch();
  }, [curParti]);

  useEffect(() => {
    const isParti = curParti === PartiOptions.PARTICIPATION;
    const newList = isParti
      ? myDaoList
      : daoList?.filter((item) => {
          if (!myDaoList?.length) return true;
          return !myDaoList.includes(item);
        });
    console.log('--------------get list. ', curParti, newList);
    setList(newList);
  }, [myDaoList, daoList, curParti]);

  return (
    <Block>
      <Form onSubmit={handleSubmit(runTransaction)}>
        <InputGroupStyled>
          {partiOptions.map((opt) => (
            <Checkbox
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '14px !important',
                fontWeight: 'bold !important',
                textTransform: 'capitalize',
              }}
              label={opt}
              key={opt}
              checked={curParti === opt}
              onChange={(e) => {
                //
                console.log('change tab: ', opt, e.target.checked);
                setCurParti(opt);
              }}
            />
          ))}
        </InputGroupStyled>

        <InputGroupStyled
          fullwidth
          error={errors.delegateAddress?.message?.toString()}
        >
          <SelectParticipation
            list={list}
            curAddress={curAddress}
            setCurAddress={setCurAddress}
            loading={loading}
          />
        </InputGroupStyled>
        <InputsGroup
          inputAmount={inputAmount}
          setInputAmount={setInputAmount}
          setSelectedCoin={setSelectedCoin}
          selectedCoin={selectedCoin}
          stockType={stockType}
          setStockType={setStockType}
        />
        {account ? (
          <Button type="submit" disabled={!isValid}>
            Deposit
          </Button>
        ) : (
          <ConnectButton style={{ width: '100%' }} />
        )}
      </Form>
    </Block>
  );
}
