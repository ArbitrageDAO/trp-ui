import { useContract, useProvider, useSigner } from 'wagmi';
import { ArbitragePrice__factory } from 'generated';
import { ContractAddress } from 'config';

export default function usePriceFactory() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: ContractAddress.ArbitragePrice,
    abi: ArbitragePrice__factory.abi,
    signerOrProvider: signer ?? provider,
  });
  return contract;
}
