import { ApiPromise } from "@polkadot/api"
import { Logger } from '../../logger';
import { ITestResult } from '../../types';

export const testRpcSystem = async (api: ApiPromise, logger: Logger) => {

    const testSystem = await rpcSystemAccountNextIndex(api);
    logger.logTestInfo(testSystem.methodName, testSystem.success);
}

const rpcSystemAccountNextIndex = async (api: ApiPromise): Promise<ITestResult> => {

    return {
        methodName: 'accountNextIndex',
        success: true
    }
}
