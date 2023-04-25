import getConfig from 'next/config';
export const { serverRuntimeConfig } = getConfig();
export { default as dynamics } from './dynamics';
export * from './rpc';
export * from './tokens';

export enum Strategy {
  EXPERT = 'expert',
  SHARE = 'share',
  EVENT = 'event',
}
