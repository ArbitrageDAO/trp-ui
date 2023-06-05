import React from 'react';
import { Button, Input } from '@lidofinance/lido-ui';
import { InputGroupStyled } from 'shared/ui';
import { InputAmount } from 'shared/ui/inputAmount';
import styled from 'styled-components';
import { StockIndex, Stock } from 'config';

const types = [Stock.SHORT, Stock.LONG];

type Props = {
  coin: string;
  stockType: StockIndex;
  inputAmount: number;
  setInputAmount: SetState<number>;
  isClosed: boolean;
};

export default function InputsGroup({
  coin,
  stockType,
  inputAmount,
  setInputAmount,
  isClosed,
}: Props) {
  return (
    <Wrapper fullwidth error={null} style={{ height: 56 }}>
      <Input readOnly value={coin} />
      <Input readOnly value={types[stockType]} />
      <InputAmountStyled
        visibility={isClosed ? 'hidden' : 'visible'}
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
        placeholder={isClosed ? '-' : ''}
        disabled={!isClosed}
      />
    </Wrapper>
  );
}

const Wrapper = styled(InputGroupStyled)`
  height: 56px;
  visibility: '';
  label {
    flex: initial;
    width: 25%;
    &:last-child {
      width: 50%;
    }
  }
`;

const InputAmountStyled = styled(InputAmount)`
  width: 40%;
`;
