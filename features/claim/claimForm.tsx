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
import {
  Button,
  Select,
  ToastError,
  Option,
  ToastSuccess,
} from '@lidofinance/lido-ui';
import { InputGroupStyled } from 'shared/ui';
import { ConnectButton } from 'features/wallet/RainbowKit/RainbowButton';
import { useAccount } from 'wagmi';
import useDaoFactory from './useDaoFactory';
import {
  ContractAddress,
  Stock,
  StockIndex,
  Strategy,
  StrategyModule,
} from 'config';

const strategies = [Strategy.EXPERT, Strategy.SHARE, Strategy.EVENT];
const stockTypes = [Stock.SHORT, Stock.LONG];

const ClaimForm: FC = () => {
  const daoFactoryContract = useDaoFactory();
  const [creating, setCreating] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState<StrategyModule>(
    StrategyModule.EXPERT,
  );
  const [currentStockType, setCurrentStockType] = useState<StockIndex>(
    StockIndex.LONG,
  );

  const { address: account } = useAccount();

  const didMountRef = useRef(false);

  // skipping first render
  useEffect(() => {
    didMountRef.current = true;
  }, []);

  const errHandle = (e: any) => {
    const msg = e?.reason || JSON.stringify(e || {}) || 'Error';
    ToastError(msg, {
      delay: 0,
      toastId: msg,
      position: 'top-center',
    });
    setCreating(false);
  };

  const handleClaim: FormEventHandler = useCallback(
    async (event) => {
      if (creating) return;
      event.preventDefault();
      console.log('dao: ', daoFactoryContract);
      if (!daoFactoryContract || !account) return;
      setCreating(true);
      try {
        daoFactoryContract
          .deploy(
            ContractAddress.pool,
            currentStockType as any,
            currentStrategy as any,
            {
              from: account,
            },
          )
          .then((tx) => {
            tx.wait(1)
              .then((res) => {
                console.log('dao发布成功: ', res);
                setCreating(false);
                ToastSuccess('Created Successfully.', {
                  delay: 0,
                  toastId: 'created',
                  position: 'top-center',
                });
              })
              .catch((error: any) => {
                errHandle(error);
              });
          })
          .catch((err) => {
            console.log('DAO发布出错：', err);
            errHandle(err);
          });
      } catch (e: any) {
        console.log('catch error: ', e?.reason, JSON.stringify(e || {}));
        errHandle(e);
      }
    },
    [daoFactoryContract],
  );

  const handleStrategySelect = useCallback(
    (strategy: any) => {
      if (strategy === currentStrategy) {
        return;
      }
      setCurrentStrategy(strategy);
    },
    [currentStrategy, setCurrentStrategy],
  );

  const handleStockSelect = useCallback(
    (stock: any) => {
      if (stock === currentStockType) {
        return;
      }
      setCurrentStockType(stock);
    },
    [currentStockType, setCurrentStockType],
  );

  return (
    <form onSubmit={handleClaim}>
      <InputGroupStyled fullwidth error={null}>
        <Button size="sm" variant="translucent" color="secondary">
          Strategy
        </Button>
        <Select value={currentStrategy} onChange={handleStrategySelect}>
          {strategies?.map((strategy, index) => (
            <Option key={strategy} value={`${index}` as StrategyModule}>
              {strategy}
            </Option>
          ))}
        </Select>
        <Select value={currentStockType} onChange={handleStockSelect}>
          {stockTypes?.map((stock, index) => (
            <Option key={stock} value={`${index}` as StockIndex}>
              {stock}
            </Option>
          ))}
        </Select>
      </InputGroupStyled>
      {account ? (
        <Button fullwidth loading={creating} onClick={handleClaim}>
          Create
        </Button>
      ) : (
        <ConnectButton />
      )}
    </form>
  );
};

export default ClaimForm;
