import React from 'react';
import { Option, Select, Button } from '@lidofinance/lido-ui';
import { InputGroupStyled } from 'shared/ui';
import { InputAmount } from 'shared/ui/inputAmount';
import styled from 'styled-components';
import { TOKENS, StockIndex, Stock } from 'config';
import { isMobile } from 'react-device-detect';

const coins = [TOKENS.BTC];
const types = [Stock.SHORT, Stock.LONG];

type Props = {
  selectedCoin: TOKENS;
  setSelectedCoin: SetState<TOKENS>;
  stockType: StockIndex;
  setStockType: SetState<StockIndex>;
  inputAmount: number;
  setInputAmount: SetState<number>;
};

export default function InputsGroup({
  selectedCoin,
  setSelectedCoin,
  stockType,
  setStockType,
  inputAmount,
  setInputAmount,
}: Props) {
  return (
    <Wrapper fullwidth error={null} style={{ height: 56 }}>
      <SelectStyled
        value={selectedCoin}
        onChange={(e: TOKENS) => setSelectedCoin(e)}
        arrow={isMobile ? 'small' : 'default'}
      >
        {coins.map((coin) => (
          <Option key={coin} value={coin}>
            {coin}
          </Option>
        ))}
      </SelectStyled>
      <SelectStyled
        value={stockType}
        onChange={(e: StockIndex) => setStockType(e)}
        arrow={isMobile ? 'small' : 'default'}
      >
        {types.map((type, index) => (
          <Option key={type} value={`${index}` as StockIndex}>
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
        value={inputAmount}
        onChange={(e: number) => {
          console.log('onChange: ', Number(e));
          const num = Number(e);
          if (num >= 0) {
            setInputAmount(num);
          }
        }}
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
