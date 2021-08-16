import { ApiPromise } from '@polkadot/api';
import { RpcPromiseResult, VoidFn } from '@polkadot/api/types';
import { Bytes, Null, Option, Text, Vec, StorageKey, Metadata } from '@polkadot/types';
import {
	ApplyExtrinsicResult,
	BlockHash,
	ChainProperties,
	Header,
	Health,
	Index,
	KeyValue,
	NodeRole,
	PeerInfo,
	ReadProof,
	RuntimeVersion,
	SignedBlock,
	SyncState,
} from '@polkadot/types/interfaces';
import { Observable } from 'rxjs';

import * as CONSTANTS from './constants';
import * as RESPONSES from './responses';
import { RpcConsts, SubstrateInterfaceTypes } from './types/config';
import { constructTx } from './util/constructTx';
import { expectCorrectType, expectToBe, expectToInclude } from './util/testApi';

const {
	authorKey,
	authorKeyType,
	offChainLocalConfig: { localSetKey, localSetValue, localGetKey },
	stateConsts: { stateKey }
} = CONSTANTS;

/**
 * Helper function for any subscriptions that are tested. 
 * 
 * @param apiFn The substrate subscription rpc method to be passed in 
 * @param reqCounter How many req's to test for, when the number is met the test
 * will return true
 * @param timeCounter How many seconds to wait for the subscriptions before timing
 * out and return false 
 */
const subscribe = async (
	apiFn: RpcPromiseResult<() => Observable<Header | RuntimeVersion>>,
	reqCounter: number,
	timeCounter: number = 30
): Promise<boolean> => {
	let count = 0;
	let whileCounter = 0;
	let isSubscribed = true;

	const arr: (Header | RuntimeVersion)[] = [];

	const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

	const unsub: VoidFn = await apiFn((res: Header | RuntimeVersion) => {
		arr.push(res);

		if (++count === reqCounter) {
			isSubscribed = false;
			unsub();
		}
	});

	// Allow a 30 second timer to fetch the subscriptions
	while (isSubscribed) {
		await timer(1000);
		whileCounter += 1;

		// 30 Seconds has gone by so we exit the subscription
		if (whileCounter === timeCounter) {
			isSubscribed = false;
			unsub();
		}
	}

	return arr.length === reqCounter;
};

export const RPC_CHAIN_CONSTS: RpcConsts = {
	author: {
		hasKey: {
			substrateDev: {
				// apiCall: async (api: ApiPromise) => await api.rpc.author.hasKey(authorKey, authorKeyType)
			},
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
				apiCall: async (api: ApiPromise) =>
					await subscribe(api.rpc.chain.subscribeAllHeads, 2),
				isSub: true,
			},
			polkadotDev: {},
		},
		subscribeFinalizedHeads: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await subscribe(api.rpc.chain.subscribeFinalizedHeads, 2),
				isSub: true,
			},
			polkadotDev: {},
		},
		subscribeNewHeads: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await subscribe(api.rpc.chain.subscribeNewHeads, 2),
				isSub: true,
			},
			polkadotDev: {},
		},
	},
	offChain: {
		localStorageGet: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await api.rpc.offchain.localStorageGet('PERSISTENT', localGetKey),
				callExpectToBe: (result: Option<Bytes>) =>
					expectToBe(result.toRawType(), 'Option<Bytes>'),
			},
			polkadotDev: {},
		},
		localStorageSet: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await api.rpc.offchain.localStorageSet(
						'PERSISTENT',
						localSetKey,
						localSetValue
					),
				callExpectToBe: (result: Null) =>
					expectToBe(result.toRawType(), 'Null'),
			},
			polkadotDev: {},
		},
	},
	state: {
		call: {
			substrateDev: {},
			polkadotDev: {},
		},
		getKeys: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getKeys(stateKey),
				callExpectToBe: (result: Vec<StorageKey>) => expectToBe(result.toRawType(), 'Vec<StorageKey>') 
			},
			polkadotDev: {},
		},
		getKeysPaged: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getKeysPaged(stateKey, 0),
				callExpectToBe: (result: Vec<StorageKey>) => expectToBe(result.toRawType(), 'Vec<StorageKey>')
			},
			polkadotDev: {},
		},
		getMetadata: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getMetadata(),
				callExpectCorrectType: (result: Metadata) => expectToBe(result.toRawType(), RESPONSES.substrateDevGetMetadataType)
			},
			polkadotDev: {},
		},
		getPairs: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getPairs('0x'),
				callExpectToBe: (result: Vec<KeyValue>) => expectToBe(result.toRawType(), 'Vec<KeyValue>')
			},
			polkadotDev: {},
		},
		getReadProof: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getReadProof([stateKey]),
				callExpectToBe: (result: ReadProof) => expectToBe(result.toRawType(), RESPONSES.substrateDevGetReadProofType)
			},
			polkadotDev: {},
		},
		getRuntimeVersion: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getRuntimeVersion(),
				callExpectToBe: (result: RuntimeVersion) => expectToBe(result.toRawType(), RESPONSES.substrateDevGetRuntimeVersionType)
			},
			polkadotDev: {},
		},
		getStorage: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await api.rpc.state.getStorage(stateKey),
				callExpectToBe: (result: SubstrateInterfaceTypes) => expectToBe(result.toJSON(), null)
			},
			polkadotDev: {},
		},
		subscribeRuntimeVersion: {
			substrateDev: {
				apiCall: async (api: ApiPromise) =>
					await subscribe(api.rpc.state.subscribeRuntimeVersion, 1, 60),
				isSub: true,
			},
			polkadotDev: {},
		},
		subscribeStorage: {
			substrateDev: {
				apiCall: async (api: ApiPromise) => await subscribe(api.rpc.state.subscribeStorage, 2),
				isSub: true,
			},
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
				apiCall: async (api: ApiPromise) =>
					await api.rpc.system.reservedPeers(),
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
				apiCall: async (api: ApiPromise) =>
					await api.rpc.system.resetLogFilter(),
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
	},
};
