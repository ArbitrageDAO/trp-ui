import { useState, useEffect, useCallback } from 'react';
import { Option, Select } from '@lidofinance/lido-ui';
import { PartiOptions } from 'config';
import { Address } from 'wagmi';

const partiOptions = [
  PartiOptions.PARTICIPATION,
  PartiOptions.NON_PARTICIPATION,
];

type Props = {
  partiList: Address[];
  nonPartiList: Address[];
  curAddress: Address;
  setCurAddress: React.Dispatch<React.SetStateAction<Address>>;
  curParti: PartiOptions;
  setCurParti: React.Dispatch<React.SetStateAction<PartiOptions>>;
};

export default function SelectParticipation({
  partiList,
  nonPartiList,
  curAddress,
  setCurAddress,
  curParti,
  setCurParti,
}: Props) {
  const [curList, setCurList] = useState<Address[]>(partiList);

  const updateList = useCallback(
    (parti?: PartiOptions) => {
      const isParti = (parti ?? curParti) === PartiOptions.PARTICIPATION;
      const newList = isParti ? partiList : nonPartiList;
      setCurList(newList);
      setCurAddress(newList[0]);
    },
    [partiList, nonPartiList, curParti, setCurList, setCurAddress],
  );

  useEffect(() => {
    updateList();
  }, [partiList, nonPartiList, updateList]);

  const selectParti = (e: PartiOptions) => {
    setCurParti(e);
    updateList(e);
  };

  const selectAddress = (e: Address) => {
    setCurAddress(e);
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
        value={curAddress}
        onChange={(e) => selectAddress(e as Address)}
        disabled={!curList.length}
        placeholder="Loading...."
      >
        {curList.map((address) => (
          <Option key={address} value={address}>
            {address}
          </Option>
        ))}
      </Select>
    </>
  );
}
