import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import SnapshotForm from 'features/snapshot';

const Snapshot: FC = () => {
  return (
    <Layout>
      <MainTitle>Go to arbitrage !</MainTitle>
      <MainSubtitle>Claim your tokens</MainSubtitle>
      <Wallet />
      <SnapshotForm />
    </Layout>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
