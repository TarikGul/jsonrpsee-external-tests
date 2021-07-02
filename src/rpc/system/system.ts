import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";
import { expectCorrectType, expectToBe } from "../../util/testApi";
import * as CONSTANTS from "../constants";

export const testRpcSystem = async (api: ApiPromise, logger: Logger) => {
  // Set the header of the test Suite
  logger.logHeader("SYSTEM");

  // All tests that need to be run
  const testMethods = [
    rpcSystemAccountNextIndex,
    rpcSystemAddLogFilter,
    // rpcSystemAddReservedPeer,
    rpcSystemChain,
    rpcSystemChainType,
    rpcSystemDryRun
  ];

  // Run all the tests above
  for (const test of testMethods) {
    const methodCall = await test(api);
    logger.logTestInfo(methodCall.methodName, methodCall.success);
  }
};

/**
 * 
 * @param api 
 */
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
const rpcSystemAddLogFilter = async (api: ApiPromise): Promise<ITestResult> => {
  const apiResult = await api.rpc.system.addLogFilter("Hello");

  const valueResult = expectToBe(apiResult.toJSON(), null);
  const typeResult = expectCorrectType(apiResult.toRawType(), "Null");

  return {
    methodName: "addLogFilter",
    success: typeResult.success && valueResult.success,
  };
};

// const rpcSystemAddReservedPeer = async (api: ApiPromise): Promise<ITestResult> => {
//   const res = await api.rpc.system.addReservedPeer('14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3');

//   const valueResult = expectToBe(res.toJSON(), null);
//   const typeResult = expectCorrectType(res.toRawType(), "Text");

//   return {
//     methodName: "",
//     success: typeResult.success && valueResult.success
//   };
// }

/**
 * 
 * @param api ApiPromise
 */
const rpcSystemChain = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.chain()

  const valueResult = expectToBe(res.toJSON(), 'Development');
  const typeResult = expectCorrectType(res.toRawType(), "Text")

  return {
    methodName: "chain",
    success: valueResult.success && typeResult.success
  };
}

const rpcSystemChainType = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.chainType();
  const expectedJSON = {
    development: null
  };
  const expectedType = '{"_enum":{"Development":"Null","Local":"Null","Live":"Null","Custom":"Text"}}';

  const valueResult = expectToBe(res.toJSON(), expectedJSON);
  const enumResult = expectToBe(res.toRawType(), expectedType);

  return {
    methodName: 'chainType',
    success: valueResult.success && enumResult.success
  }
}

/**
 * Construct a transaction and then attempt a dry run with an extrinisic to be 'submitted'
 * 
 * @param api 
 * @returns 
 */
const rpcSystemDryRun = async (api: ApiPromise): Promise<ITestResult> => {
  const hash = await api.rpc.chain.getFinalizedHead()
  const res = await api.rpc.system.dryRun(CONSTANTS.ALICE_TX, hash);

  const valueResult = expectToBe(res.toJSON(), '');
  console.log(res.toJSON());
  const typeResult = expectCorrectType(res.toRawType(), 'ApplyExtrinsicResult');

  return {
    methodName: 'dryRun',
    success: valueResult.success && typeResult.success
  }
}
