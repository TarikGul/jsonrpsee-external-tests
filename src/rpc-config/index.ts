import { RpcConsts } from '../types/config';
import { chain } from './chain';
import { offChain } from './offchain';
import { system } from './system';
import { state } from './state';

export * from './subscribe';

export const RPC_TEST_CONFIG: RpcConsts = {
	chain,
	offChain,
    state,
	system,
};
