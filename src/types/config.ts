import { ApiPromise } from '@polkadot/api';
import {
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

export interface IChainSpecMethods {
	apiCall?: (api: ApiPromise) => Promise<SubstrateInterfaceTypes>;
	apiCallSub?: (api: ApiPromise) => Promise<boolean>;
	apiCallTx?: (api: ApiPromise, tx: string) => Promise<SubstrateInterfaceTypes>;
	apiCallUnknown?: (api: ApiPromise) => Promise<unknown>;
	isSub?: boolean;
	callConstructTx?: () => Promise<string>;
	callExpectToBe?: Function;
	callExpectToInclude?: Function;
	callExpectCorrectType?: Function;
}

// Union type of all potential interface && Primitive types that polkadot/api can return for rpc methods
export type SubstrateInterfaceTypes =
	| BlockHash
	| ChainType
	| Index
	| Null
	| Health
	| Header
	| ApplyExtrinsicResult
	| Text
	| Metadata
	| Vec<Text>
	| Vec<NodeRole>
	| Vec<PeerInfo>
	| Vec<StorageKey>
	| Vec<KeyValue>
	| ChainProperties
	| Option<Bytes>
	| SyncState
	| ReadProof
	| RuntimeVersion
	| SignedBlock;
