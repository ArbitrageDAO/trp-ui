/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ClaimForm from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Block } from '@lidofinance/lido-ui';
import useQueryDaoList from 'features/hooks/useQueryDaoList';

export default function Home() {
  const { loading, myArbitrageList, refetch, abMap } = useQueryDaoList();

  useEffect(() => {
    if (refetch) refetch();
  }, []);

  return (
    <>
      <Block>
        <ClaimForm refetch={refetch} />
      </Block>
      <Section title="DAO">
        <FAQ
          myArbitrageList={myArbitrageList}
          loading={loading}
          abMap={abMap}
        />
      </Section>
    </>
  );
}
