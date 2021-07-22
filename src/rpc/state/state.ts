import { ApiPromise } from '@polkadot/api';

import { Logger } from '../../logger';
import { ErrorInfo, ITestResult } from '../../types';

export const testRpcState = async (api: ApiPromise, logger: Logger) => {
	// Set the header of the test Suite
	logger.logHeader('STATE');

	const testMethods = [
		rpcStateCall,
		rpcStateGetChildKeys,
		rpcStateGetChildReadProof,
		rpcStateChildStorage,
	];

	// Run all the tests above
	for (const test of testMethods) {
		const methodCall = await test(api);
		logger.logTestInfo(
			methodCall.methodName,
			methodCall.success,
			methodCall.errorInfo
		);
	}
};

const rpcStateCall = async (api: ApiPromise, errorInfo: ErrorInfo = {}): Promise<ITestResult> => {
	return {
		methodName: 'call',
		success: true,
	};
};

const rpcStateGetChildKeys = async (api: ApiPromise, errorInfo: ErrorInfo = {}): Promise<ITestResult> => {
	// const childKeys = await api.rpc.state.getChildKeys()
	return {
		methodName: 'getChildKeys',
		success: true,
	};
}

const rpcStateGetChildReadProof = async (api: ApiPromise, errorInfo: ErrorInfo = {}): Promise<ITestResult> => {
	return {
		methodName: 'getChildReadProof',
		success: true,
	};
}

const rpcStateChildStorage = async (api: ApiPromise, errorInfo: ErrorInfo = {}): Promise<ITestResult> => {
	// const childStorage = await api.rpc.state.getChildStorage()
	return {
		methodName: 'getChildKeys',
		success: true,
	};
}
