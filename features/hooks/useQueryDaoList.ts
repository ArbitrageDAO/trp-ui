import { useEffect, useState, useCallback } from 'react';
import type { Address } from 'wagmi';
import useDaoFactory from 'features/hooks/useDaoFactory';
import { useAccount, useSigner } from 'wagmi';
import { BigNumber } from 'ethers';

let stop = false;

type ABMap = {
  dao: Address;
  arbitrage: Address;
};

export default function useQueryDaoList() {
  const [myArbitrageList, setMyArbitrageList] = useState<Address[]>();
  const [arbitrageList, setArbitrageList] = useState<Address[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);
  const [abMap, setAbMap] = useState<ABMap[]>([]);
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
    const ab_Map: ABMap[] = [];
    for (let i = 1; i <= factoryCount; i++) {
      const bnIndex = BigNumber.from(i);
      const arbitrageDao = await daoFactoryContract.factory_arbitragedao(
        bnIndex,
      );
      allList.push(arbitrageDao.arbitrage);
      ab_Map.push({
        dao: arbitrageDao.dao,
        arbitrage: arbitrageDao.arbitrage,
      });
      if (i <= userIndex) {
        const myArbitrageDao = await daoFactoryContract.user_arbitragedao(
          account,
          bnIndex,
        );
        partiList.push(myArbitrageDao.arbitrage);
      }
    }
    console.log('=== list: ', partiList, allList, ab_Map);
    setMyArbitrageList(() => partiList);
    setArbitrageList(() => allList);
    setLoading(false);
    setAbMap(() => ab_Map);
    stop = true;
  }, [daoFactoryContract, account, signer]);

  useEffect(() => {
    query();
  }, [daoFactoryContract, account, signer, query, refresh]);

  useEffect(() => {
    if (stop && account) {
      refetch();
    }
  }, [account]);

  return {
    myArbitrageList,
    arbitrageList,
    loading,
    refetch,
    daoFactoryContract,
    account,
    abMap,
    signer,
  };
}
