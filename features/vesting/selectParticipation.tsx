import { useState, useMemo } from 'react';
import { Option, Select } from '@lidofinance/lido-ui';
import { PartiOperations, PartiOptions } from 'config';

const partiOptions = [
  PartiOptions.PARTICIPATION,
  PartiOptions.NON_PARTICIPATION,
];
const operations = {
  [PartiOptions.PARTICIPATION]: [
    PartiOperations.DEPOSIT,
    PartiOperations.ENTRY,
    PartiOperations.LIQUID,
    PartiOperations.WITHDRAW,
  ],
  [PartiOptions.NON_PARTICIPATION]: [PartiOperations.DEPOSIT],
};
export default function SelectParticipation() {
  const [curParti, setCurParti] = useState<PartiOptions>(
    PartiOptions.PARTICIPATION,
  );
  const [curOperation, setCurOperation] = useState<PartiOperations>(
    PartiOperations.DEPOSIT,
  );
  const curOperations = useMemo(() => operations[curParti], [curParti]);

  const selectParti = (e: PartiOptions) => {
    setCurParti(e);
    setCurOperation(operations[e][0]);
  };

  const selectOpt = (e: PartiOperations) => {
    setCurOperation(e);
  };

  return (
    <>
      <Select value={curParti} onChange={(e) => selectParti(e as PartiOptions)}>
        {partiOptions.map((opt) => (
          <Option key={opt} value={opt}>
            {opt}
          </Option>
        ))}
      </Select>
      <Select
        value={curOperation}
        onChange={(e) => selectOpt(e as PartiOperations)}
      >
        {curOperations.map((operation) => (
          <Option key={operation} value={operation}>
            {operation}
          </Option>
        ))}
      </Select>
    </>
  );
}
