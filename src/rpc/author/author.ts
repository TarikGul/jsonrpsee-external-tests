import { ApiPromise } from '@polkadot/api';

import { Logger } from '../../logger';
import { ErrorInfo, ITestResult } from '../../types';
import { expectCorrectType } from '../../util/testApi';

export const testRpcAuthor = async (
	api: ApiPromise,
	logger: Logger
): Promise<void> => {
	// Set the header of the test Suite
	logger.logHeader('AUTHOR');

	// All tests that need to be run
	const testMethods = [rpcAuthorHasKey];

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

const rpcAuthorHasKey = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	// const res = await api.rpc.author
	// 	.hasKey('', 'sr25519')
	// 	.catch((err) => (errorInfo.error = err));

	// const valueResult = expectCorrectType(res.toRawType(), 'bool');
	// console.log('hit the next bit');
	return {
		methodName: 'hasKey',
		success: false,
	};
};
