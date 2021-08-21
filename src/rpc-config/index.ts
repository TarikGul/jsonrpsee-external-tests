import { RpcConsts } from '../types/config';
import { chain } from './chain';
import { offChain } from './offchain';
import { state } from './state';
import { system } from './system';

export * from './subscribe';

export const RPC_TEST_CONFIG: RpcConsts = {
	chain,
	offChain,
	state,
	system,
};
