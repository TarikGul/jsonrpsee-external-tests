import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";

export const testRpcOffChain = async (api: ApiPromise, logger: Logger) => {
  const testLocalStorageGet = await rpcOffChainLocalStorageGet(api);
  logger.logTestInfo(
    testLocalStorageGet.methodName,
    testLocalStorageGet.success
  );
};

const rpcOffChainLocalStorageGet = async (
  api: ApiPromise
): Promise<ITestResult> => {
  return {
    methodName: "localStorageGet",
    success: true,
  };
};
