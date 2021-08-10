import { ApiPromise } from '@polkadot/api';
import { Null, Text } from '@polkadot/types';
import { ApplyExtrinsicResult, Index } from '@polkadot/types/interfaces';

import * as CONSTANTS from './constants';
import { RpcConsts } from './types/config';
import { constructTx } from './util/constructTx';
import { expectCorrectType, expectToBe } from './util/testApi';

export const RPC_CHAIN_CONSTS: RpcConsts = {
	author: {
		hasKey: {
			substrateDev: {},
			polkadotDev: {},
		},
		hasSessionKeys: {
			substrateDev: {},
			polkadotDev: {},
		},
		insertKey: {
			substrateDev: {},
			polkadotDev: {},
		},
		pendingExtrinsics: {
			substrateDev: {},
			polkadotDev: {},
		},
		removeExtrinsic: {
			substrateDev: {},
			polkadotDev: {},
		},
		rotateKeys: {
			substrateDev: {},
			polkadotDev: {},
		},
		submitAndWatchExtrinsic: {
			substrateDev: {},
			polkadotDev: {},
		},
		submitExtrinsic: {
			substrateDev: {},
			polkadotDev: {},
		},
	},
	chain: {
		getBlock: {
			substrateDev: {},
			polkadotDev: {},
		},
		getBlockHash: {
			substrateDev: {},
			polkadotDev: {},
		},
		getFinalizedHead: {
			substrateDev: {},
			polkadotDev: {},
		},
		getHeader: {
			substrateDev: {},
			polkadotDev: {},
		},
		subscribeAllHeads: {
			substrateDev: {},
			polkadotDev: {},
		},
		subscribeFinalizedHeads: {
			substrateDev: {},
			polkadotDev: {},
		},
		subscribeNewHeads: {
			substrateDev: {},
			polkadotDev: {},
		},
	},
	offChain: {
		localStorageGet: {
			substrateDev: {},
			polkadotDev: {},
		},
		localStorageSet: {
			substrateDev: {},
			polkadotDev: {},
		},
	},
	state: {
		call: {
			substrateDev: {},
			polkadotDev: {},
		},
		getChildKeys: {
			substrateDev: {},
			polkadotDev: {},
		},
		getChildReadProof: {
			substrateDev: {},
			polkadotDev: {},
		},
		getChildStorage: {
			substrateDev: {},
			polkadotDev: {},
		},
		getChildStorageHash: {
			substrateDev: {},
			polkadotDev: {},
		},
		getChildStorageSize: {
			substrateDev: {},
			polkadotDev: {},
		},
		getKeys: {
			substrateDev: {},
			polkadotDev: {},
		},
		getKeysPaged: {
			substrateDev: {},
			polkadotDev: {},
		},
		getMetadata: {
			substrateDev: {},
			polkadotDev: {},
		},
		getPairs: {
			substrateDev: {},
			polkadotDev: {},
		},
		getReadProof: {
			substrateDev: {},
			polkadotDev: {},
		},
		getRuntimeVersion: {
			substrateDev: {},
			polkadotDev: {},
		},
		getStorage: {
			substrateDev: {},
			polkadotDev: {},
		},
		getStorageAt: {
			substrateDev: {},
			polkadotDev: {},
		},
		subscribeRuntimeVersion: {
			substrateDev: {},
			polkadotDev: {},
		},
		subscribeStorage: {
			substrateDev: {},
			polkadotDev: {},
		},
		traceBlock: {
			substrateDev: {},
			polkadotDev: {},
		},
	},
	system: {
		accountNextIndex: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await api.rpc.system.accountNextIndex(CONSTANTS.ALICE_ADDR),
				callExpectToBe: (result: Index) => expectToBe(result.toNumber(), 0),
				callExpectCorrectType: (result: Index) =>
					expectCorrectType(result.toRawType(), 'u32'),
			},
			polkadotDev: {},
		},
		addLogFilter: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await api.rpc.system.addLogFilter('Hello'),
				callExpectToBe: (result: Null) => expectToBe(result.toJSON(), null),
				callExpectCorrectType: (result: Null) =>
					expectCorrectType(result.toRawType(), 'Null'),
			},
			polkadotDev: {},
		},
		addReservedPeer: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await api.rpc.system.addReservedPeer(CONSTANTS.ALICE_BOOTNODE),
				callExpectToBe: (result: Text) => expectToBe(result.toJSON(), ''),
				callExpectCorrectType: (result: Text) =>
					expectCorrectType(result.toRawType(), 'Text'),
			},
			polkadotDev: {},
		},
		chain: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.chain(),
				callExpectToBe: (result: Text) =>
					expectToBe(result.toJSON(), 'Development'),
				callExpectCorrectType: (result: Text) =>
					expectCorrectType(result.toRawType(), 'Text'),
			},
			polkadotDev: {},
		},
		chainType: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.chainType(),
				callExpectToBe: (result: Text) =>
					expectToBe(result.toJSON(), { development: null }),
			},
			polkadotDev: {},
		},
		dryRun: {
			substrateDev: {
				apiCall: async (api: ApiPromise, tx: string) =>
					await api.rpc.system.dryRun(tx),
				callConstructTx: async () => await constructTx(),
				callExpectToBe: (result: ApplyExtrinsicResult) =>
					expectToBe(result.isOk, true),
			},
			polkadotDev: {},
		},
		health: {
			substrateDev: {},
			polkadotDev: {},
		},
		localListenAddresses: {
			substrateDev: {},
			polkadotDev: {},
		},
		localPeerId: {
			substrateDev: {},
			polkadotDev: {},
		},
		name: {
			substrateDev: {},
			polkadotDev: {},
		},
		networkState: {
			substrateDev: {},
			polkadotDev: {},
		},
		nodeRoles: {
			substrateDev: {},
			polkadotDev: {},
		},
		peers: {
			substrateDev: {},
			polkadotDev: {},
		},
		properties: {
			substrateDev: {},
			polkadotDev: {},
		},
		removeReservedPeer: {
			substrateDev: {},
			polkadotDev: {},
		},
		reservedPeers: {
			substrateDev: {},
			polkadotDev: {},
		},
		resetLogFilter: {
			substrateDev: {},
			polkadotDev: {},
		},
		syncState: {
			substrateDev: {},
			polkadotDev: {},
		},
		version: {
			substrateDev: {},
			polkadotDev: {},
		},
	},
};
