/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import type { Address } from 'wagmi';
import { useToken } from 'wagmi';
import usePriceFactory from './usePriceFactory';
import useUniFactory from './useUniFactory';
import useGovDaoFactory from './useGovDaoFactory';

type Props = {
  dao?: Address;
  arbitrage?: Address;
};

let stop = false;

export default function useDaoInfo({ dao, arbitrage }: Props) {
  const [tokenA, setTokenA] = useState<Address>();
  const [tokenB, setTokenB] = useState<Address>();
  const [pool, setPool] = useState<Address>();
  const [stock, setStock] = useState<number>(0);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(1);
  const priceFactoryContract = usePriceFactory();
  const uniFactoryContract = useUniFactory(arbitrage);
  const govDaoFactoryContract = useGovDaoFactory(dao);
  const { data: tokenAInfo } = useToken({ address: tokenA });

  const refetch = () => {
    stop = false;
    setRefresh((n) => ++n);
  };

  const query = useCallback(async () => {
    if (
      !arbitrage ||
      !dao ||
      !priceFactoryContract ||
      !uniFactoryContract ||
      !govDaoFactoryContract ||
      stop
    )
      return;
    const poolAddress = await uniFactoryContract.pool();
    const isLong = (await uniFactoryContract.stock_index()).toNumber();
    const closed = (await uniFactoryContract.close_stock()).toNumber();
    setPool(poolAddress);
    setStock(() => isLong);
    setIsClosed(Boolean(closed));
    const strategy = await govDaoFactoryContract.strategy();
    const priceInfo = await priceFactoryContract.prices(strategy);
    setTokenA(priceInfo.tokenA);
    setTokenB(priceInfo.tokenB);
    stop = true;
    console.log(
      '---- dao info: ',
      isLong,
      dao,
      arbitrage,
      poolAddress,
      closed,
      priceInfo,
      strategy,
      uniFactoryContract,
    );
  }, [
    priceFactoryContract,
    uniFactoryContract,
    govDaoFactoryContract,
    dao,
    arbitrage,
  ]);

  useEffect(() => {
    query();
  }, [
    priceFactoryContract,
    uniFactoryContract,
    govDaoFactoryContract,
    dao,
    arbitrage,
    query,
    refresh,
  ]);

  useEffect(() => {
    if (stop && dao && arbitrage) {
      refetch();
    }
  }, [dao, arbitrage]);

  return {
    tokenA,
    symbolA: tokenAInfo?.symbol,
    tokenB,
    pool,
    stock,
    isClosed,
    refetch,
    priceFactoryContract,
    uniFactoryContract,
  };
}
