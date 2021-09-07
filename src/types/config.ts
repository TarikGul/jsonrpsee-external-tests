import { ApiPromise } from '@polkadot/api';
import {
	bool,
	Bytes,
	Metadata,
	Null,
	Option,
	StorageKey,
	Text,
	Vec,
} from '@polkadot/types';
import {
	ApplyExtrinsicResult,
	BlockHash,
	ChainProperties,
	ChainType,
	Extrinsic,
	ExtrinsicStatus,
	H256,
	Hash,
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

// Nested Object, we grab all the keys and using them as string inside of the
// test logic, therefore we save it as a Record string.
export type RpcConsts = Record<string, RpcMethods>;

// Rpc methods for a pallet
export type RpcMethods = Record<string, ITestConfig>;

// Configuration tuple
export type TestConfigTuple = [ITestInfo, ITestConfig];

// Object will change to what the test options are going to be
export type ITestConfig = Record<string, IChainSpecMethods>;

// Counter used for each test that is ran
export interface TestCounter {
	success: number;
	error: number;
}

// Basic information regarding a single test
export interface ITestInfo {
	method: string;
	pallet: string;
}

// Chain spec methods that are assigned to a methods config
export interface IChainSpecMethods {
	apiCall?: (api: ApiPromise) => Promise<SubstrateInterfaceTypes>;
	apiCallSub?: (api: ApiPromise) => Promise<boolean>;
	apiCallTx?: (api: ApiPromise, tx: string) => Promise<SubstrateInterfaceTypes>;
	apiCallUnknown?: (api: ApiPromise) => Promise<unknown>;
	isSub?: boolean;
	callConstructTx?: (api: ApiPromise) => Promise<string>;
	callConstructContract?: (api: ApiPromise) => Promise<any>;
	callExpectToBe?: Function;
	callExpectToInclude?: Function;
	callExpectCorrectType?: Function;
}

// Union type of all potential interface types that polkadot/api can return for rpc methods
export type SubstrateInterfaceTypes =
	| bool
	| BlockHash
	| ChainType
	| Index
	| Null
	| Health
	| ExtrinsicStatus
	| Header
	| ApplyExtrinsicResult
	| Text
	| H256
	| Metadata
	| Vec<Text>
	| Vec<NodeRole>
	| Vec<PeerInfo>
	| Vec<StorageKey>
	| Vec<KeyValue>
	| Vec<Extrinsic>
	| Vec<Hash>
	| ChainProperties
	| Option<Bytes>
	| SyncState
	| ReadProof
	| RuntimeVersion
	| SignedBlock;
