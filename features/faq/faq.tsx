import { memo } from 'react';
import { Block, Table, Thead, Tbody, Tr, Th, Td } from '@lidofinance/lido-ui';
import styled from 'styled-components';
import type { Address } from 'wagmi';

type Props = {
  createdDaoList: Address[];
  createdABList: Address[];
};

export const FAQ = memo(({ createdABList, createdDaoList }: Props) => {
  const shortAddress = (address: string) => {
    return `${address.substring(0, 8)}....${address.substring(
      address.length - 9,
      address.length - 1,
    )}`;
  };
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
                <Td>{shortAddress(createdABList[index])}</Td>
                <Td>{shortAddress(createdDaoList[index])}</Td>
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
