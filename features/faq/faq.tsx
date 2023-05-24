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
  createdDaoList: Address[];
  createdABList: Address[];
};

export const FAQ = memo(({ createdABList, createdDaoList }: Props) => {
  return (
    <Block>
      <StyledTable style={{ width: '100%', textAlign: 'center' }}>
        <Thead>
          <Tr>
            <Th>Dao</Th>
            <Th>Arbitrage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {createdABList.length > 0 &&
            createdABList.map((_, index) => (
              <Tr key={createdABList[index]}>
                {[createdDaoList[index], createdABList[index]].map((i) => (
                  <Td key={i}>
                    <ShortHash address={i} symbols={8} as="a" title={i} />
                  </Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </StyledTable>
      {!createdABList.length && (
        <div style={{ marginTop: 10, textAlign: 'center' }}>None</div>
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
