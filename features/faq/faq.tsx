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
  myDaoList?: Address[];
  loading?: boolean;
};

export const FAQ = memo(({ myDaoList, loading }: Props) => {
  return (
    <Block>
      <StyledTable style={{ width: '100%', textAlign: 'center' }}>
        <Thead>
          <Tr>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!loading &&
            myDaoList &&
            myDaoList?.length > 0 &&
            myDaoList.map((item) => (
              <Tr key={item}>
                <Td>
                  <ShortHash address={item} symbols={8} as="a" title={item} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </StyledTable>
      {!loading && !myDaoList?.length && (
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
