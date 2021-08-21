import { ApiPromise } from '@polkadot/api';
import { Null, Text, Vec } from '@polkadot/types';
import {
	ApplyExtrinsicResult,
	ChainProperties,
	Health,
	Index,
	NodeRole,
	PeerInfo,
	SyncState,
} from '@polkadot/types/interfaces';

import * as CONSTANTS from '../constants';
import * as RESPONSES from '../responses';
import { RpcMethods } from '../types';
import { constructTx } from '../util/constructTx';
import {
	expectCorrectType,
	expectToBe,
	expectToInclude,
} from '../util/testApi';

export const system: RpcMethods = {
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
			apiCallTx: async (api: ApiPromise, tx: string) =>
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
			callExpectCorrectType: (result: Vec<Text>) =>
				expectToBe(result.toRawType(), 'Vec<Text>'),
		},
		polkadotDev: {},
	},
	removeReservedPeer: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.system.removeReservedPeer(
					RESPONSES.substrateDevRemovePeer
				),
			callExpectToBe: (result: Text) => expectToBe(result.toString(), ''),
		},
		polkadotDev: {},
	},
	resetLogFilter: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.system.resetLogFilter(),
			callExpectToBe: (result: Null) => expectToBe(result.toString(), ''),
			callExpectCorrectType: (result: Null) =>
				expectCorrectType(result.toRawType(), 'Null'),
		},
		polkadotDev: {},
	},
	syncState: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.system.syncState(),
			callExpectToBe: (result: SyncState) =>
				expectToBe(result.toRawType(), RESPONSES.substrateDevSyncStateType),
		},
		polkadotDev: {},
	},
	version: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.system.version(),
			callExpectCorrectType: (result: Text) =>
				expectCorrectType(result.toRawType(), 'Text'),
		},
		polkadotDev: {},
	},
};
