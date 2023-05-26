import { useState, useEffect, useCallback } from 'react';
import { Option, Select } from '@lidofinance/lido-ui';
import { PartiOptions } from 'config';
import { Address } from 'wagmi';
import { isMobile } from 'react-device-detect';

// const partiOptions = [
//   PartiOptions.PARTICIPATION,
//   PartiOptions.NON_PARTICIPATION,
// ];

type Props = {
  partiList: Address[];
  nonPartiList: Address[];
  curAddress: Address;
  setCurAddress: SetState<Address>;
  curParti: PartiOptions;
  setCurParti: SetState<PartiOptions>;
  loading: boolean;
};

export default function SelectParticipation({
  partiList,
  nonPartiList,
  curAddress,
  setCurAddress,
  curParti,
  loading,
}: // setCurParti,
Props) {
  const [curList, setCurList] = useState<Address[]>(partiList);
  const updateList = useCallback(
    (parti?: PartiOptions) => {
      console.log(parti);
      const isParti = (parti ?? curParti) === PartiOptions.PARTICIPATION;
      const newList = isParti ? partiList : nonPartiList;
      setCurList(newList);
      setCurAddress(newList[0]);
    },
    [partiList, nonPartiList, curParti, setCurList, setCurAddress],
  );

  useEffect(() => {
    updateList(curParti);
  }, [partiList, nonPartiList, updateList, curParti]);

  // const selectParti = (e: PartiOptions) => {
  //   setCurParti(e);
  //   updateList(e);
  // };

  const selectAddress = (e: Address) => {
    setCurAddress(e);
  };

  return (
    <>
      {/* <Select
        value={curParti}
        onChange={(e) => selectParti(e as PartiOptions)}
        arrow={isMobile ? 'small' : 'default'}
      >
        {partiOptions.map((opt) => (
          <Option key={opt} value={opt}>
            {opt}
          </Option>
        ))}
      </Select> */}
      <Select
        value={curAddress}
        onChange={(e) => selectAddress(e as Address)}
        disabled={!curList.length}
        placeholder={loading ? 'Loading....' : ''}
        arrow={isMobile ? 'small' : 'default'}
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
