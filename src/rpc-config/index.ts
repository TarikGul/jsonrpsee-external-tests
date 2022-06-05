import { RpcConsts } from '../types/config';
import { author } from './author';
import { chain } from './chain';
import { offChain } from './offchain';
import { state } from './state';
import { syncState } from './syncState';
import { system } from './system';

export * from './subscribe';

export const rpcTestConfig: RpcConsts = {
	author,
	chain,
	offChain,
	state,
	system,
	syncState,
};
