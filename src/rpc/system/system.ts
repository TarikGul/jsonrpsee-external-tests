import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";
import * as CONSTANTS from '../constants';

export const testRpcSystem = async (api: ApiPromise, logger: Logger) => {
  const testSystem = await rpcSystemAccountNextIndex(api);
  logger.logTestInfo(testSystem.methodName, testSystem.success);
};

const rpcSystemAccountNextIndex = async (
    api: ApiPromise
): Promise<ITestResult> => {
    const accountIndex = await api.rpc.system.accountNextIndex(CONSTANTS.ALICE_ADDR)
  
    console.log(`RESULT: ${accountIndex}`);
    return {
        methodName: "accountNextIndex",
        success: true,
    };
};
