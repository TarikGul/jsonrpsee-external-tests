import { ApiPromise } from "@polkadot/api";

import { Logger } from "../../logger";
import { ITestResult } from "../../types";
import { expectCorrectType, expectToBe } from "../../util/testApi";
import { constructTx } from '../../util/constructTx';
import * as CONSTANTS from "../constants";

export const testRpcSystem = async (api: ApiPromise, logger: Logger) => {
  // Set the header of the test Suite
  logger.logHeader("SYSTEM");

  // All tests that need to be run
  const testMethods = [
    rpcSystemAccountNextIndex,
    rpcSystemAddLogFilter,
    rpcSystemAddReservedPeer,
    rpcSystemChain,
    rpcSystemChainType,
    rpcSystemDryRun,
    rpcSystemHealth,
    rpcSystemLocalListenAddresses,
    rpcSystemLocalPeerId,
    rpcSystemName,
    rpcSystemNetworkState,
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

const rpcSystemAddReservedPeer = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.addReservedPeer(CONSTANTS.ALICE_BOOTNODE);

  const valueResult = expectToBe(res.toJSON(), '');
  const typeResult = expectCorrectType(res.toRawType(), "Text");

  return {
    methodName: "addReservedPeer",
    success: typeResult.success && valueResult.success
  };
}

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
  const enumType = '{"_enum":{"Development":"Null","Local":"Null","Live":"Null","Custom":"Text"}}';

  const valueResult = expectToBe(res.toJSON(), expectedJSON);
  const enumResult = expectToBe(res.toRawType(), enumType);

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
  const tx = await constructTx();
  const res = await api.rpc.system.dryRun(tx);

  const valueResult = expectToBe(res.isOk, true);
  const typeResult = expectToBe(res.type, 'Ok');

  return {
    methodName: 'dryRun',
    success: valueResult.success && typeResult.success
  }
}


const rpcSystemHealth = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.health();
  const expectedJson = {
    peers: 0,
    isSyncing: false,
    shouldHavePeers: false
  }
  const enumType = '{"peers":"u64","isSyncing":"bool","shouldHavePeers":"bool"}';

  const valueResult = expectToBe(res.toJSON(), expectedJson);
  const enumResult = expectToBe(res.toRawType(), enumType);

  return {
    methodName: 'health',
    success: valueResult.success && enumResult.success
  }
}

const rpcSystemLocalListenAddresses = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.localListenAddresses();
  const expectedArray = [
    '/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
    '/ip4/192.168.86.249/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
    '/ip4/192.168.2.1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
    '/ip6/::1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT'
  ];

  const valueResult = expectToBe(res.toJSON(), expectedArray);
  const typeResult = expectCorrectType(res.toRawType(), 'Vec<Text>');

  return {
    methodName: 'localListenAddresses',
    success: valueResult.success && typeResult.success
  }
}

const rpcSystemLocalPeerId = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.localPeerId();

  const valueResult = expectToBe(res.toString(), '12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT');
  const typeResult = expectCorrectType(res.toRawType(), 'Text');

  return {
    methodName: 'localPeerId',
    success: valueResult.success && typeResult.success
  }
}

const rpcSystemName = async (api: ApiPromise): Promise<ITestResult> => {
  const res = await api.rpc.system.name();

  const valueResult = expectToBe(res.toString(), 'Substrate Node');
  const typeResult = expectToBe(res.toRawType(), 'Text');

  return {
    methodName: 'name',
    success: valueResult.success && typeResult.success
  }
}

/**
 * UNSTABLE Automatically fail for now.
 * 
 * @param api 
 * @returns 
 */
const rpcSystemNetworkState = async (api: ApiPromise): Promise<ITestResult> => {
  return {
    methodName: 'networkState',
    success: false
  }
}
