import { ApiPromise } from '@polkadot/api';
import { BlockHash, Header, SignedBlock } from '@polkadot/types/interfaces';

import * as RESPONSES from '../responses';
import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';
import { subscribe } from './';

export const chain: RpcMethods = {
	getBlock: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.chain.getBlock(),
			callExpectToBe: (result: SignedBlock) =>
				expectToBe(result.toRawType(), RESPONSES.substrateDevGetBlockType),
		},
		polkadotDev: {},
	},
	getBlockHash: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.chain.getBlockHash(),
			callExpectToBe: (result: BlockHash) =>
				expectToBe(result.toRawType(), 'H256'),
		},
		polkadotDev: {},
	},
	getFinalizedHead: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.chain.getFinalizedHead(),
			callExpectToBe: (result: BlockHash) =>
				expectToBe(result.toRawType(), 'H256'),
		},
		polkadotDev: {},
	},
	getHeader: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.chain.getHeader(),
			callExpectToBe: (result: Header) =>
				expectToBe(result.toRawType(), RESPONSES.substrateDevGetHeaderType),
		},
		polkadotDev: {},
	},
	subscribeAllHeads: {
		substrateDev: {
			apiCallSub: async (api: ApiPromise) =>
				await subscribe(api.rpc.chain.subscribeAllHeads, 2),
			isSub: true,
		},
		polkadotDev: {},
	},
	subscribeFinalizedHeads: {
		substrateDev: {
			apiCallSub: async (api: ApiPromise) =>
				await subscribe(api.rpc.chain.subscribeFinalizedHeads, 2),
			isSub: true,
		},
		polkadotDev: {},
	},
	subscribeNewHeads: {
		substrateDev: {
			apiCallSub: async (api: ApiPromise) =>
				await subscribe(api.rpc.chain.subscribeNewHeads, 2),
			isSub: true,
		},
		polkadotDev: {},
	},
};
