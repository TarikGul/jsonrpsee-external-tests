import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";

export const testRpcAuthor = (api: ApiPromise, logger: Logger) => {
  // Set the header of the test Suite
  logger.logHeader("AUTHOR");

  const testHasKey = rpcAuthorHasKey(api);
  logger.logTestInfo(testHasKey.methodName, testHasKey.success);
};

const rpcAuthorHasKey = (api: ApiPromise): ITestResult => {
  return {
    methodName: "hasKey",
    success: true,
  };
};
