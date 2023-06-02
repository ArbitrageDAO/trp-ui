import { useContract, useProvider, useSigner } from 'wagmi';
import { ContractAddress } from 'config';
import { ArbitrageDaoFactory__factory } from 'generated';

export default function useDaoFactory() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: ContractAddress.ArbitrageDaoFactory,
    abi: ArbitrageDaoFactory__factory.abi,
    signerOrProvider: signer ?? provider,
  });
  return contract;
}
