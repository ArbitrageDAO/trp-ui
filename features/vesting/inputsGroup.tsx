import { useState } from 'react';
import { Option, Select, Button } from '@lidofinance/lido-ui';
import { InputGroupStyled } from 'shared/ui';
import { InputAmount } from 'shared/ui/inputAmount';
import styled from 'styled-components';
// import { isMobile } from 'react-device-detect';

const coins = ['BTC', 'ETH'];
const types = ['Long', 'Short'];

export default function InputsGroup() {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedType, setSelectedType] = useState('Long');
  return (
    <Wrapper fullwidth error={null} style={{ height: 56 }}>
      <SelectStyled
        value={selectedCoin}
        onChange={(e: string) => setSelectedCoin(e)}
      >
        {coins.map((coin) => (
          <Option key={coin} value={coin}>
            {coin}
          </Option>
        ))}
      </SelectStyled>
      <SelectStyled
        value={selectedType}
        onChange={(e: string) => setSelectedType(e)}
      >
        {types.map((type) => (
          <Option key={type} value={type}>
            {type}
          </Option>
        ))}
      </SelectStyled>
      <InputAmountStyled
        rightDecorator={
          <Button size="xxs" variant="translucent" color="secondary">
            $
          </Button>
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled(InputGroupStyled)`
  height: 56px;
  label {
    flex: initial;
    width: 25%;
    &:last-child {
      width: 50%;
    }
  }
`;

const SelectStyled = styled(Select)`
  padding: 0 10px;
  span {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    svg {
      width: 24px;
    }
  }
`;

const InputAmountStyled = styled(InputAmount)`
  width: 40%;
`;
