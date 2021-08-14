import { Null, Text, Vec } from '@polkadot/types';
import {
	ApplyExtrinsicResult,
	ChainProperties,
	Health,
	Index,
	NodeRole,
	PeerInfo,
	SyncState
} from '@polkadot/types/interfaces';

// Nested Object, we grab all the keys and using them as string inside of the
// test logic, therefore we save it as a Record string.
export type RpcConsts = Record<string, Record<string, ITestConfig>>;

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
	apiCall?: Function;
	callConstructTx?: Function;
	callExpectToBe?: Function;
	callExpectToInclude?: Function;
	callExpectCorrectType?: Function;
}

// Union type of all potential interface && Primitive types that polkadot/api can return for rpc methods
export type SubstrateInterfaceTypes =
	| Index
	| Null
	| Health
	| ApplyExtrinsicResult
	| Text
	| Vec<Text>
	| Vec<NodeRole>
	| Vec<PeerInfo>
	| ChainProperties
	| SyncState;
