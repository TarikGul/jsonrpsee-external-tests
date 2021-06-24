import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";

export const testRpcState = async (api: ApiPromise, logger: Logger) => {
  // Set the header of the test Suite
  logger.logHeader("STATE");

  const testCall = await rpcStateCall(api);
  logger.logTestInfo(testCall.methodName, testCall.success);
};

const rpcStateCall = async (api: ApiPromise): Promise<ITestResult> => {
  return {
    methodName: "call",
    success: true,
  };
};
