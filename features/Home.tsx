import { useState } from 'react';
import ClaimForm from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Block } from '@lidofinance/lido-ui';
import type { Address } from 'wagmi';

export default function Home() {
  const [createdDaoList, setCreatedDaoList] = useState<Address[]>([]);
  const [createdABList, setCreatedABList] = useState<Address[]>([]);
  return (
    <>
      <Block>
        <ClaimForm
          createdABList={createdABList}
          setCreatedABList={setCreatedABList}
          createdDaoList={createdDaoList}
          setCreatedDaoList={setCreatedDaoList}
        />
      </Block>
      <Section title="DAO">
        <FAQ createdABList={createdABList} createdDaoList={createdDaoList} />
      </Section>
    </>
  );
}
