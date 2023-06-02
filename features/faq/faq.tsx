import { memo } from 'react';
import {
  Block,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Address as ShortHash,
} from '@lidofinance/lido-ui';
import styled from 'styled-components';
import type { Address } from 'wagmi';

type Props = {
  myArbitrageList?: Address[];
  loading?: boolean;
  abMap: {
    dao: Address;
    arbitrage: Address;
  }[];
};

export const FAQ = memo(({ myArbitrageList, loading, abMap }: Props) => {
  return (
    <Block>
      <StyledTable style={{ width: '100%', textAlign: 'center' }}>
        <Thead>
          <Tr>
            <Th>Arbitrage</Th>
            <Th>Dao</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!loading &&
            myArbitrageList &&
            myArbitrageList?.length > 0 &&
            myArbitrageList.map((item) => {
              const index = abMap?.findIndex((ab) => ab.arbitrage === item);
              return (
                <Tr key={item}>
                  <Td>
                    <ShortHash address={item} symbols={8} as="a" title={item} />
                  </Td>
                  <Td>
                    <ShortHash
                      address={abMap[index].dao}
                      symbols={8}
                      as="a"
                      title={abMap[index].dao}
                    />
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </StyledTable>
      {!loading && !myArbitrageList?.length && (
        <div style={{ marginTop: 10, textAlign: 'center' }}>None</div>
      )}
      {loading && (
        <div style={{ marginTop: 10, textAlign: 'center' }}>Loading....</div>
      )}
    </Block>
  );
});

FAQ.displayName = 'FAQ';

const StyledTable = styled(Table)`
  width: 100%;
  * {
    text-align: center;
  }
  th {
    width: 50%;
  }
`;
