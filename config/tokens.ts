import type { Address } from 'wagmi';

// Must be lowercase
const TOKENS_BY_ADDRESS: Record<string, string> = {
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0': 'WSTETH', // mainnet
  '0x6320cd32aa674d2898a68ec82e869385fc5f7e2f': 'WSTETH', // testnet
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84': 'STETH', // mainnet
  '0x1643e812ae58766192cf7d2cf9567df2c37e9b7f': 'STETH', // testnet
  '0x5a98fcbea516cf06857215779fd812ca3bef1b32': 'LDO',
  '0x56340274fb5a72af1a3c6609061c451de7961bd4': 'TESTLDO',
};

export const getTokenByAddress = (address: string): string => {
  return TOKENS_BY_ADDRESS[address.toLowerCase()] ?? '';
};

export const ContractAddress: Record<string, Address> = {
  ArbitrageDaoFactory: '0x8f87Ac9172E102c33eAA873546C8eA794D031B22',
  pool: '0xF1C20E7E78665bb07bb78Ce15c0953D60f446B32',
  BTC: '0x1C2f71a40E7448Dd578C752b570D676284004048',
  // USDC: '0x9191806b17D80546013bB6dAB6e9709e778Bb130',
};

export const FEE = 500;

export enum TOKENS {
  BTC = 'BTC',
  // USDC = 'USDC',
}
