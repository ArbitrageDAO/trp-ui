import { memo } from 'react';
import { Block, Table, Thead, Tbody, Tr, Th, Td } from '@lidofinance/lido-ui';

export const FAQ = memo(() => {
  return (
    <Block>
      <Table>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>address</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>russell</Td>
            <Td>0x18c4B872E0e547d052110507950bC098a62b3036</Td>
          </Tr>
          <Tr>
            <Td>peter</Td>
            <Td>0x18c4B872E0e547d052110507950bC098a62b3036</Td>
          </Tr>
        </Tbody>
      </Table>
    </Block>
  );
});

FAQ.displayName = 'FAQ';
