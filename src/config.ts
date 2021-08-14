import { ApiPromise } from '@polkadot/api';
import { Null, Text, Vec } from '@polkadot/types';
import {
	ApplyExtrinsicResult,
	BlockHash,
	ChainProperties,
	Health,
	Header,
	Index,
	NodeRole,
	PeerInfo,
	SyncState,
	SignedBlock
} from '@polkadot/types/interfaces';

import * as CONSTANTS from './constants';
import * as RESPONSES from './responses';
import { RpcConsts } from './types/config';
import { constructTx } from './util/constructTx';
import { expectCorrectType, expectToBe, expectToInclude } from './util/testApi';

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
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.chain.getBlock(),
				callExpectToBe: (result: SignedBlock) => expectToBe(result.toRawType(), RESPONSES.substrateDevGetBlockType)
			},
			polkadotDev: {},
		},
		getBlockHash: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.chain.getBlockHash(),
				callExpectToBe: (result: BlockHash) => expectToBe(result.toRawType(), 'H256')
			},
			polkadotDev: {},
		},
		getFinalizedHead: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.chain.getFinalizedHead(),
				callExpectToBe: (result: BlockHash) => expectToBe(result.toRawType(), 'H256')
			},
			polkadotDev: {},
		},
		getHeader: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.chain.getHeader(),
				callExpectToBe: (result: Header) => expectToBe(result.toRawType(), RESPONSES.substrateDevGetHeaderType)
			},
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
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.health(),
				callExpectToBe: (result: Health) =>
					expectToBe(result.toJSON(), RESPONSES.substrateDevHealthRes),
			},
			polkadotDev: {},
		},
		localListenAddresses: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await api.rpc.system.localListenAddresses(),
				callExpectToInclude: (result: Vec<Text>) =>
					expectToInclude(
						result.toJSON() as string[],
						RESPONSES.substrateDevLocalAddresses
					),
			},
			polkadotDev: {},
		},
		localPeerId: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.localPeerId(),
				callExpectCorrectType: (result: Text) =>
					expectCorrectType(result.toRawType(), 'Text'),
			},
			polkadotDev: {},
		},
		name: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.name(),
				callExpectToBe: (result: Text) =>
					expectToBe(result.toString(), 'Substrate Node'),
			},
			polkadotDev: {},
		},
		nodeRoles: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.nodeRoles(),
				callExpectToBe: (result: Vec<NodeRole>) =>
					expectToBe(result.toString(), '[Authority]'),
			},
			polkadotDev: {},
		},
		peers: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.peers(),
				callExpectToBe: (result: Vec<PeerInfo>) =>
					expectToBe(result.toJSON(), []),
			},
			polkadotDev: {},
		},
		properties: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.properties(),
				callExpectToBe: (result: ChainProperties) =>
					expectToBe(result.toString(), RESPONSES.substrateDevProperties),
				callExpectCorrectType: (result: ChainProperties) =>
					expectCorrectType(result.toRawType(), 'Json'),
			},
			polkadotDev: {},
		},
		reservedPeers: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.reservedPeers(),
				callExpectCorrectType: (result: Vec<Text>) => expectToBe(result.toRawType(), 'Vec<Text>')
			},
			polkadotDev: {},
		},
		removeReservedPeer: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.removeReservedPeer(RESPONSES.substrateDevRemovePeer),
				callExpectToBe: (result: Text) => expectToBe(result.toString(), '') 
			},
			polkadotDev: {},
		},
		resetLogFilter: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.resetLogFilter(),
				callExpectToBe: (result: Null) => expectToBe(result.toString(), ''),
				callExpectCorrectType: (result: Null) => expectCorrectType(result.toRawType(), 'Null')
			},
			polkadotDev: {},
		},
		syncState: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.syncState(),
				callExpectToBe: (result: SyncState) => expectToBe(result.toRawType(), RESPONSES.substrateDevSyncStateType)
			},
			polkadotDev: {},
		},
		version: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.system.version(),
				callExpectCorrectType: (result: Text) => expectCorrectType(result.toRawType(), 'Text')
			},
			polkadotDev: {},
		},
	},
};
