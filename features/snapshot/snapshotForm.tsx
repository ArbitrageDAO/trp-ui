/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Block,
  Button,
  Checkbox,
  ToastSuccess,
  ToastError,
} from '@lidofinance/lido-ui';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
import { Form } from './snapshotFormStyles';
import SelectParticipation from 'features/vesting/selectParticipation';
import { ConnectButton } from 'features/wallet/RainbowKit/RainbowButton';
import InputsGroup from 'features/vesting/inputsGroup';
import { Address, useFeeData, erc20ABI, useContract } from 'wagmi';
import { PartiOptions, TOKENS, StockIndex } from 'config';
import useQueryDaoList from 'features/hooks/useQueryDaoList';
import useDaoInfo from 'features/hooks/useDaoInfo';
import { BigNumber, ethers } from 'ethers';

type SnapshotFormData = {
  delegateAddress: string;
};

const partiOptions = [
  PartiOptions.PARTICIPATION,
  PartiOptions.NON_PARTICIPATION,
];

let timer: any = null;

export default function SnapshotForm() {
  const [curParti, setCurParti] = useState<PartiOptions>(
    PartiOptions.PARTICIPATION,
  );
  const {
    loading,
    refetch,
    myArbitrageList,
    arbitrageList,
    account,
    abMap,
    signer,
  } = useQueryDaoList();
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [curAddress, setCurAddress] = useState<Address>();
  const [list, setList] = useState<Address[]>();
  const [trading, setTrading] = useState<boolean>(false);
  const { data: feeData, isError: feeErr } = useFeeData();
  const ab = abMap.filter((item) => item.arbitrage === curAddress)[0] ?? {};
  const {
    stock,
    isClosed,
    tokenA,
    tokenB,
    symbolA,
    refetch: refetchInfo,
    uniFactoryContract,
  } = useDaoInfo(ab);

  const tokenAContract = useContract({
    address: tokenA,
    abi: erc20ABI,
    signerOrProvider: signer,
  });

  const tokenBContract = useContract({
    address: tokenB,
    abi: erc20ABI,
    signerOrProvider: signer,
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const errHandle = (e: any, mark?: string) => {
    const msg = e?.reason || JSON.stringify(e || {}) || 'Error';
    console.log('===>>> error ', msg, mark, ' --->', e);
    ToastError(msg, {
      delay: 0,
      toastId: msg,
      position: 'top-center',
    });
  };

  const runTransaction = async (data: SnapshotFormData) => {
    if (
      !curAddress ||
      !uniFactoryContract ||
      !account ||
      trading ||
      !signer ||
      !tokenAContract ||
      !tokenBContract
    )
      return;
    console.log('submit: ', data, inputAmount);
    if (!isClosed) {
      if (inputAmount < 0) return;
      setTrading(true);
      const approveBTC = await tokenAContract
        .connect(signer)
        .approve(
          '0x66722B3AE570cAe1C64AC9C7DfAe806E9F563df0',
          BigNumber.from(inputAmount),
        );
      await approveBTC.wait();
      console.log('approve btc: ', tokenA, tokenB, approveBTC);
      uniFactoryContract
        .connect(signer)
        .deposit(BigNumber.from(inputAmount), {
          from: account,
          gasLimit: BigNumber.from(98535),
          gasPrice: feeErr
            ? ethers.utils.parseUnits('9.0', 'gwei')
            : (feeData?.gasPrice as any),
        })
        .then((tx) => {
          tx.wait(3)
            .then((res) => {
              console.log('dao发布成功: ', res);
              ToastSuccess('Created Successfully.', {
                delay: 0,
                toastId: 'created',
                position: 'top-center',
              });
              refetchInfo();
              setTrading(false);
            })
            .catch((error) => {
              errHandle(error, 'debug1');
              setTrading(false);
            });
        })
        .catch((e) => {
          console.log('catch error: ', e?.reason, JSON.stringify(e || {}));
          errHandle(e, 'debug2');
          setTrading(false);
        });
    } else {
      uniFactoryContract
        .withdraw({
          from: account,
          gasLimit: BigNumber.from(49723),
          gasPrice: feeErr
            ? ethers.utils.parseUnits('9.0', 'gwei')
            : (feeData?.gasPrice as any),
        })
        .then((tx) => {
          console.log('交易tx: ', tx);
          tx.wait(3)
            .then((res) => {
              console.log('提取成功: ', res);
              ToastSuccess('Withdraw Successfully.', {
                delay: 0,
                toastId: 'created',
                position: 'top-center',
              });
            })
            .catch((error) => {
              errHandle(error, 'Withdraw debug');
              setTrading(false);
            });
        });
    }
  };

  useEffect(() => {
    refetch();
    clearInterval(timer);
  }, [curParti]);

  useEffect(() => {
    const isParti = curParti === PartiOptions.PARTICIPATION;
    const newList = isParti
      ? myArbitrageList
      : arbitrageList?.filter((item) => {
          if (!myArbitrageList?.length) return true;
          return !myArbitrageList.includes(item);
        });
    console.log('--------------get list. ', curParti, newList);
    setList(newList);
    setCurAddress(newList?.[0]);
  }, [myArbitrageList, arbitrageList, curParti]);

  useEffect(() => {
    if (!isClosed) {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        // refetchInfo();
      }, 3000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isClosed, curAddress]);

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
          coin={symbolA || TOKENS.BTC}
          stockType={Number(stock) > 0 ? StockIndex.LONG : StockIndex.SHORT}
        />
        {account ? (
          <Button
            type="submit"
            disabled={!isValid || !curAddress}
            loading={trading}
          >
            {isClosed ? 'Withdraw' : 'Deposit'}
          </Button>
        ) : (
          <ConnectButton style={{ width: '100%' }} />
        )}
      </Form>
    </Block>
  );
}
