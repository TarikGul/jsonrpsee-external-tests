import { RpcConsts } from '../types/config';
import { author } from './author';
import { chain } from './chain';
import { offChain } from './offchain';
import { state } from './state';
import { system } from './system';

export * from './subscribe';

export const RPC_TEST_CONFIG: RpcConsts = {
	author,
	chain,
	offChain,
	state,
	system,
};
