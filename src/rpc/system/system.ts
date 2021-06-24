import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";
import { expectCorrectType, expectToBe } from "../../util/testApi";
import * as CONSTANTS from "../constants";

export const testRpcSystem = async (api: ApiPromise, logger: Logger) => {
  // Set the header of the test Suite
  logger.logHeader("SYSTEM");

  // All tests that need to be run
  const testMethods = [rpcSystemAccountNextIndex, rpcSystemAddLogFilter];

  // Run all the tests above
  for (const test of testMethods) {
    const methodCall = await test(api);
    logger.logTestInfo(methodCall.methodName, methodCall.success);
  }
};

const rpcSystemAccountNextIndex = async (
  api: ApiPromise
): Promise<ITestResult> => {
  const accountIndex = await api.rpc.system.accountNextIndex(
    CONSTANTS.ALICE_ADDR
  );

  const valueResult = expectToBe(accountIndex.toNumber(), 0);
  const typeResult = expectCorrectType(accountIndex.toRawType(), "u32");

  return {
    methodName: "accountNextIndex",
    success: valueResult.success && typeResult.success,
  };
};

/**
 * This rpc method has a return value of Null
 *
 * @param api ApiPromise
 * @returns
 */
const rpcSystemAddLogFilter = async (api: ApiPromise) => {
  const apiResult = await api.rpc.system.addLogFilter("Hello");

  const valueResult = expectToBe(apiResult.toJSON(), null);
  const typeResult = expectCorrectType(apiResult.toRawType(), "Null");

  return {
    methodName: "addLogFilter",
    success: typeResult.success && valueResult.success,
  };
};
