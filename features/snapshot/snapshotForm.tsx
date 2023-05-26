/* eslint-disable react-hooks/exhaustive-deps */
import { Block, Button, Checkbox } from '@lidofinance/lido-ui';
import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
// import { InputAmount } from 'shared/ui/inputAmount';
import { Form } from './snapshotFormStyles';
import SelectParticipation from 'features/vesting/selectParticipation';
import { useAccount, useSigner } from 'wagmi';
import { ConnectButton } from 'features/wallet/RainbowKit/RainbowButton';
import InputsGroup from 'features/vesting/inputsGroup';
import useDaoFactory from 'features/claim/useDaoFactory';
import type { Address } from 'wagmi';
import { BigNumber } from 'ethers';
import { PartiOptions, TOKENS, StockIndex } from 'config';

type SnapshotFormData = {
  delegateAddress: string;
};

const partiOptions = [
  PartiOptions.PARTICIPATION,
  PartiOptions.NON_PARTICIPATION,
];

export default function SnapshotForm() {
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const [partiList, setPartiList] = useState<Address[]>([]);
  const [nonPartiList, setNonPartiList] = useState<Address[]>([]);
  const [curParti, setCurParti] = useState<PartiOptions>(
    PartiOptions.PARTICIPATION,
  );
  const [curAddress, setCurAddress] = useState<Address>(partiList[0]);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [selectedCoin, setSelectedCoin] = useState<TOKENS>(TOKENS.BTC);
  const [stockType, setStockType] = useState<StockIndex>(StockIndex.SHORT);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const daoFactoryContract = useDaoFactory();

  const runTransaction = (data: SnapshotFormData) => {
    // const { delegateAddress } = data;
    // const callData = await encodeCalldata(delegateAddress);
    // await snapshotDelegate(callData);
    console.log(data);
  };

  const queryPartiList = useCallback(async () => {
    if (loading || !daoFactoryContract || !account || !signer) return;
    setLoading(true);
    const userIndex = (await daoFactoryContract.user_index(account)).toNumber();
    const factoryCount = (await daoFactoryContract.factory_count()).toNumber();
    console.log('use index: ', userIndex, factoryCount);
    const newPartiList = partiList ?? [];
    const newNonPartiList = nonPartiList ?? [];
    for (let i = 1; i <= factoryCount; i++) {
      const arbitrageDao = await daoFactoryContract.factory_arbitragedao(
        BigNumber.from(i),
      );
      if (i <= userIndex) {
        const myArbitrageDao = await daoFactoryContract.user_arbitragedao(
          account,
          BigNumber.from(i),
        );
        newPartiList.push(myArbitrageDao.arbitrage);
        console.log('my parti list: ', i, myArbitrageDao.arbitrage);
      } else {
        newNonPartiList.push(arbitrageDao.arbitrage);
      }

      console.log('parti list: ', i, arbitrageDao.arbitrage);
    }
    setPartiList(() => newPartiList);
    setNonPartiList(() =>
      newNonPartiList.filter((addr) => !newPartiList.includes(addr)),
    );
    setLoading(false);
  }, [daoFactoryContract, account, signer]);

  useEffect(() => {
    queryPartiList();
  }, [daoFactoryContract, account, queryPartiList]);

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
                console.log(opt, e.target.checked);
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
            partiList={partiList}
            nonPartiList={nonPartiList}
            curParti={curParti}
            setCurParti={setCurParti}
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
