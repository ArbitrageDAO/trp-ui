import { FC, useCallback, useEffect, useState } from 'react';
import { SelectProps, Option, Select } from '@lidofinance/lido-ui';
import { Strategy } from 'config';

const strategies = [Strategy.EXPERT, Strategy.SHARE, Strategy.EVENT];

type SelectVestingProps = Omit<SelectProps, 'icon'> & {
  error?: string;
};

export const SelectStrategy: FC<SelectVestingProps> = ({
  label,
  onChange,
  rest,
}) => {
  const [currentStrategy, setCurrentStrategy] = useState<Strategy>(
    Strategy.EXPERT,
  );

  useEffect(() => {
    onChange?.(currentStrategy);
  }, [onChange, currentStrategy]);

  const handleVestingSelect = useCallback(
    (strategy: any) => {
      if (strategy === currentStrategy) {
        return;
      }
      setCurrentStrategy(strategy as Strategy);
    },
    [currentStrategy, setCurrentStrategy],
  );

  return (
    <Select
      value={currentStrategy}
      onChange={handleVestingSelect}
      label={label}
      {...rest}
    >
      {strategies?.map((strategy) => (
        <Option key={strategy} value={strategy}>
          {strategy}
        </Option>
      ))}
    </Select>
  );
};
