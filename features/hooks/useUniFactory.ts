import { useEffect } from 'react';
import { useContract, useProvider, useSigner } from 'wagmi';
import { ArbitrageUniV3__factory } from 'generated';
import type { Address } from 'wagmi';

export default function useUniFactory(contractAddress?: Address) {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: contractAddress,
    abi: ArbitrageUniV3__factory.abi,
    signerOrProvider: signer ?? provider,
  });
  useEffect(() => {
    console.log('useUniFactory === ', contract);
  }, [contract]);

  return contract;
}
