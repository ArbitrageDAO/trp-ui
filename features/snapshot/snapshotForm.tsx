import { Block, Button } from '@lidofinance/lido-ui';
import { useVestingSnapshotDelegate } from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
import { InputAmount } from 'shared/ui/inputAmount';
import { Form } from './snapshotFormStyles';
import { useVotingEncodeSnapshotCalldata } from './useVotingAdapter';
import SelectParticipation from 'features/vesting/selectParticipation ';

type SnapshotFormData = {
  delegateAddress: string;
};

export const SnapshotForm = () => {
  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const encodeCalldata = useVotingEncodeSnapshotCalldata();
  const snapshotDelegate = useVestingSnapshotDelegate();

  const runTransaction = useCallback(
    async (data: SnapshotFormData) => {
      const { delegateAddress } = data;
      const callData = await encodeCalldata(delegateAddress);
      await snapshotDelegate(callData);
    },
    [encodeCalldata, snapshotDelegate],
  );

  return (
    <Block>
      <Form onSubmit={handleSubmit(runTransaction)}>
        <InputGroupStyled
          fullwidth
          error={errors.delegateAddress?.message?.toString()}
        >
          {/* <SelectVesting error={errors.delegateAddress != null} /> */}
          <SelectParticipation />
        </InputGroupStyled>
        {/* <InputAddress
          fullwidth
          label="Delegate to address"
          error={errors.delegateAddress != null}
          {...register('delegateAddress', {
            validate: validateAddress,
            required: true,
          })}
        /> */}
        <InputAmount
          style={{ marginBottom: 16 }}
          leftDecorator={
            <>
              <Button size="xxs" variant="translucent">
                BTC
              </Button>
              &nbsp;&nbsp;
              <Button size="xxs" variant="translucent" color="warning">
                Short
              </Button>
            </>
          }
          rightDecorator={
            <Button size="xxs" variant="translucent" color="secondary">
              $
            </Button>
          }
        />
        <Button type="submit" disabled={!isValid}>
          Delegate
        </Button>
      </Form>
    </Block>
  );
};
