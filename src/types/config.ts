// Object will change to what the test options are going to be
export interface ITestConfig {
	development: Object;
}

// Nested Object, we grab all the keys and using them as string inside of the
// test logic, therefore we save it as a Record string.
export type RpcConsts = Record<string, Record<string, ITestConfig>>;
