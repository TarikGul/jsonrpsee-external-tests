// Nested Object, we grab all the keys and using them as string inside of the
// test logic, therefore we save it as a Record string.
export type RpcConsts = Record<string, Record<string, ITestConfig>>;

//
export type TestConfigTuple = [ITestInfo, ITestConfig];

// Basic information regarding a single test
export interface ITestInfo {
	method: string;
	pallet: string;
}

// Object will change to what the test options are going to be
export interface ITestConfig {
	development: Object;
}
