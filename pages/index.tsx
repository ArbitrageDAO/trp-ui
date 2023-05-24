import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import Home from 'features/Home';

const Index: FC = () => {
  return (
    <Layout>
      <MainTitle>Go to arbitrage !</MainTitle>
      <MainSubtitle>Claim your tokens</MainSubtitle>
      <Wallet />
      <Home />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
