import { Address, useContract, useProvider, useSigner } from 'wagmi';
import { GovDao__factory } from 'generated';

export default function useGovDaoFactory(address?: Address) {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    address,
    abi: GovDao__factory.abi,
    signerOrProvider: signer ?? provider,
  });
  return contract;
}
