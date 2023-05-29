import ClaimForm from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Block } from '@lidofinance/lido-ui';
import useQueryDaoList from 'features/hooks/useQueryDaoList';

export default function Home() {
  const { loading, myDaoList, refetch } = useQueryDaoList();
  return (
    <>
      <Block>
        <ClaimForm refetch={refetch} />
      </Block>
      <Section title="DAO">
        <FAQ myDaoList={myDaoList} loading={loading} />
      </Section>
    </>
  );
}
