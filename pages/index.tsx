import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Block } from '@lidofinance/lido-ui';
import { Layout } from 'features/layout';
import { ClaimForm } from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';

const Home: FC = () => {
  return (
    <Layout>
      <MainTitle>Go to arbitrage !</MainTitle>
      <MainSubtitle>Claim your tokens</MainSubtitle>
      <Wallet />
      <Block>
        <ClaimForm />
      </Block>
      <Section title="DAO">
        <FAQ />
      </Section>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
