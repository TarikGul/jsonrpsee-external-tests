import {Index} from '@polkadot/types/interfaces';

// Nested Object, we grab all the keys and using them as string inside of the
// test logic, therefore we save it as a Record string.
export type RpcConsts = Record<string, Record<string, ITestConfig>>;

// Configuration tuple
export type TestConfigTuple = [ITestInfo, ITestConfig];

// Object will change to what the test options are going to be
export type ITestConfig = Record<string, IChainSpecMethods>

// Basic information regarding a single test
export interface ITestInfo {
	method: string;
	pallet: string;
}

export interface IChainSpecMethods {
	apiCall?: Function
}

// Union type of all potential interface types that polkadot/api can return for rpc methods
export type SubstrateInterfaceTypes = Index 