import { ApiPromise } from '@polkadot/api';
import { RpcConsts } from './types/config';
import * as CONSTANTS from './constants';

export const RPC_CHAIN_CONSTS: RpcConsts = {
	author: {
		hasKey: {
			substrateDev: {},
			polkadotDev: {}
		},
		hasSessionKeys: {
			substrateDev: {},
			polkadotDev: {}
		},
		insertKey: {
			substrateDev: {},
			polkadotDev: {}
		},
		pendingExtrinsics: {
			substrateDev: {},
			polkadotDev: {}
		},
		removeExtrinsic: {
			substrateDev: {},
			polkadotDev: {}
		},
		rotateKeys: {
			substrateDev: {},
			polkadotDev: {}
		},
		submitAndWatchExtrinsic: {
			substrateDev: {},
			polkadotDev: {}
		},
		submitExtrinsic: {
			substrateDev: {},
			polkadotDev: {}
		},
	},
	chain: {
		getBlock: {
			substrateDev: {},
			polkadotDev: {}
		},
		getBlockHash: {
			substrateDev: {},
			polkadotDev: {}
		},
		getFinalizedHead: {
			substrateDev: {},
			polkadotDev: {}
		},
		getHeader: {
			substrateDev: {},
			polkadotDev: {}
		},
		subscribeAllHeads: {
			substrateDev: {},
			polkadotDev: {}
		},
		subscribeFinalizedHeads: {
			substrateDev: {},
			polkadotDev: {}
		},
		subscribeNewHeads: {
			substrateDev: {},
			polkadotDev: {}
		},
	},
	offChain: {
		localStorageGet: {
			substrateDev: {},
			polkadotDev: {}
		},
		localStorageSet: {
			substrateDev: {},
			polkadotDev: {}
		},
	},
	state: {
		call: {
			substrateDev: {},
			polkadotDev: {}
		},
		getChildKeys: {
			substrateDev: {},
			polkadotDev: {}
		},
		getChildReadProof: {
			substrateDev: {},
			polkadotDev: {}
		},
		getChildStorage: {
			substrateDev: {},
			polkadotDev: {}
		},
		getChildStorageHash: {
			substrateDev: {},
			polkadotDev: {}
		},
		getChildStorageSize: {
			substrateDev: {},
			polkadotDev: {}
		},
		getKeys: {
			substrateDev: {},
			polkadotDev: {}
		},
		getKeysPaged: {
			substrateDev: {},
			polkadotDev: {}
		},
		getMetadata: {
			substrateDev: {},
			polkadotDev: {}
		},
		getPairs: {
			substrateDev: {},
			polkadotDev: {}
		},
		getReadProof: {
			substrateDev: {},
			polkadotDev: {}
		},
		getRuntimeVersion: {
			substrateDev: {},
			polkadotDev: {}
		},
		getStorage: {
			substrateDev: {},
			polkadotDev: {}
		},
		getStorageAt: {
			substrateDev: {},
			polkadotDev: {}
		},
		subscribeRuntimeVersion: {
			substrateDev: {},
			polkadotDev: {}
		},
		subscribeStorage: {
			substrateDev: {},
			polkadotDev: {}
		},
		traceBlock: {
			substrateDev: {},
			polkadotDev: {}
		},
	},
	system: {
		accountNextIndex: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>  await api.rpc.system.accountNextIndex(CONSTANTS.ALICE_ADDR)
			},
			polkadotDev: {}
		},
		addLogFilter: {
			substrateDev: {},
			polkadotDev: {}
		},
		addReservedPeer: {
			substrateDev: {},
			polkadotDev: {}
		},
		chain: {
			substrateDev: {},
			polkadotDev: {}
		},
		chainType: {
			substrateDev: {},
			polkadotDev: {}
		},
		dryRun: {
			substrateDev: {},
			polkadotDev: {}
		},
		health: {
			substrateDev: {},
			polkadotDev: {}
		},
		localListenAddresses: {
			substrateDev: {},
			polkadotDev: {}
		},
		localPeerId: {
			substrateDev: {},
			polkadotDev: {}
		},
		name: {
			substrateDev: {},
			polkadotDev: {}
		},
		networkState: {
			substrateDev: {},
			polkadotDev: {}
		},
		nodeRoles: {
			substrateDev: {},
			polkadotDev: {}
		},
		peers: {
			substrateDev: {},
			polkadotDev: {}
		},
		properties: {
			substrateDev: {},
			polkadotDev: {}
		},
		removeReservedPeer: {
			substrateDev: {},
			polkadotDev: {}
		},
		reservedPeers: {
			substrateDev: {},
			polkadotDev: {}
		},
		resetLogFilter: {
			substrateDev: {},
			polkadotDev: {}
		},
		syncState: {
			substrateDev: {},
			polkadotDev: {}
		},
		version: {
			substrateDev: {},
			polkadotDev: {}
		},
	},
};
