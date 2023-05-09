import getConfig from 'next/config';
export const { serverRuntimeConfig } = getConfig();
export { default as dynamics } from './dynamics';
export * from './rpc';
export * from './tokens';

export enum Stock {
  LONG = 'Long',
  SHORT = 'Short',
}

export enum StockIndex {
  SHORT = '0',
  LONG = '1',
}

export enum StrategyModule {
  EXPERT = '0',
  SHARE = '1',
  EVENT = '2',
}

export enum Strategy {
  EXPERT = 'expert',
  SHARE = 'share',
  EVENT = 'event',
}

export enum PartiOperations {
  DEPOSIT = 'deposit',
  ENTRY = 'entry',
  LIQUID = 'liquid',
  WITHDRAW = 'withdraw',
}

export enum PartiOptions {
  PARTICIPATION = 'participation',
  NON_PARTICIPATION = 'non-participation',
}
