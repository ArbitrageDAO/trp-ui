import { useEffect, useState, useCallback } from 'react';
import type { Address } from 'wagmi';
import useDaoFactory from 'features/claim/useDaoFactory';
import { useAccount, useSigner } from 'wagmi';
import { BigNumber } from 'ethers';

let stop = false;

export default function useQueryDaoList() {
  const [myDaoList, setMyDaoList] = useState<Address[]>();
  const [daoList, setDaoList] = useState<Address[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const daoFactoryContract = useDaoFactory();

  const refetch = () => {
    stop = false;
    setRefresh((n) => ++n);
  };

  const query = useCallback(async () => {
    console.log('---- fetching dao list');
    if (!daoFactoryContract || !account || !signer || stop) return;
    const userIndex = (await daoFactoryContract.user_index(account)).toNumber();
    const factoryCount = (await daoFactoryContract.factory_count()).toNumber();
    const partiList: Address[] = [];
    const allList: Address[] = [];
    for (let i = 1; i <= factoryCount; i++) {
      const bnIndex = BigNumber.from(i);
      const arbitrageDao = await daoFactoryContract.factory_arbitragedao(
        bnIndex,
      );
      allList.push(arbitrageDao.arbitrage);
      if (i <= userIndex) {
        const myArbitrageDao = await daoFactoryContract.user_arbitragedao(
          account,
          bnIndex,
        );
        partiList.push(myArbitrageDao.arbitrage);
      }
    }
    console.log('=== list: ', partiList, allList);
    setMyDaoList(() => partiList);
    setDaoList(() => allList);
    setLoading(false);
    stop = true;
  }, [daoFactoryContract, account, signer]);

  useEffect(() => {
    query();
  }, [daoFactoryContract, account, signer, query, refresh]);

  return { myDaoList, daoList, loading, refetch };
}
