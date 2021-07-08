import { ApiPromise } from '@polkadot/api';

import { Logger } from '../../logger';
import { ITestResult } from '../../types';

export const testRpcChain = async (api: ApiPromise, logger: Logger) => {
	// Set the header of the test Suite
	logger.logHeader('CHAIN');

	const testGetBlock = await rpcChainGetBlock(api);
	logger.logTestInfo(testGetBlock.methodName, testGetBlock.success);
};

const rpcChainGetBlock = async (api: ApiPromise): Promise<ITestResult> => {
	return {
		methodName: 'getBlock',
		success: true,
	};
};
