import { useState, useEffect } from 'react';
import { Option, Select } from '@lidofinance/lido-ui';
import { Address } from 'wagmi';
import { isMobile } from 'react-device-detect';

type Props = {
  list?: Address[];
  curAddress?: Address;
  setCurAddress: SetState<Address | undefined>;
  loading: boolean;
};

export default function SelectParticipation({
  list,
  setCurAddress,
  curAddress,
  loading,
}: Props) {
  const [curList, setCurList] = useState<Address[]>();
  useEffect(() => {
    setCurList(list);
    setCurAddress(list?.[0]);
  }, [list, setCurAddress]);

  const selectAddress = (e: Address) => {
    setCurAddress(e);
  };

  return (
    <Select
      value={curAddress}
      onChange={(e) => selectAddress(e as Address)}
      disabled={!curList?.length}
      placeholder={loading ? 'Loading....' : 'No data'}
      arrow={isMobile ? 'small' : 'default'}
    >
      {curList?.length &&
        curList.map((address) => (
          <Option key={address} value={address}>
            {address}
          </Option>
        ))}
    </Select>
  );
}
