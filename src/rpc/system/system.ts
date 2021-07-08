import { ApiPromise, ApiRx } from '@polkadot/api';

import { Logger } from '../../logger';
import { ErrorInfo, ITestResult } from '../../types';
import { constructTx } from '../../util/constructTx';
import {
	expectCorrectType,
	expectToBe,
	expectToInclude,
} from '../../util/testApi';
import * as CONSTANTS from '../constants';

export const testRpcSystem = async (api: ApiPromise, logger: Logger): Promise<void> => {
	// Set the header of the test Suite
	logger.logHeader('SYSTEM');

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
		rpcSystemNodeRoles,
		rpcSystemPeers,
		rpcSystemProperties,
		rpcSystemReservedPeers,
		rpcSystemRemoveReservedPeers,
		rpcSystemResetLogFilter,
		rpcSystemSyncState,
		rpcSystemVersion,
	];

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

/**
 *
 * @param api
 */
const rpcSystemAccountNextIndex = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const accountIndex = await api.rpc.system
		.accountNextIndex(CONSTANTS.ALICE_ADDR)
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(accountIndex.toNumber(), 0);
	const typeResult = expectCorrectType(accountIndex.toRawType(), 'u32');

	return {
		methodName: 'accountNextIndex',
		success: valueResult.success && typeResult.success,
		errorInfo,
	};
};

/**
 * This rpc method has a return value of Null
 *
 * @param api ApiPromise
 * @returns
 */
const rpcSystemAddLogFilter = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const apiResult = await api.rpc.system
		.addLogFilter('Hello')
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(apiResult.toJSON(), null);
	const typeResult = expectCorrectType(apiResult.toRawType(), 'Null');

	return {
		methodName: 'addLogFilter',
		success: typeResult.success && valueResult.success,
		errorInfo,
	};
};

const rpcSystemAddReservedPeer = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.addReservedPeer(CONSTANTS.ALICE_BOOTNODE)
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(res.toJSON(), '');
	const typeResult = expectCorrectType(res.toRawType(), 'Text');

	return {
		methodName: 'addReservedPeer',
		success: typeResult.success && valueResult.success,
		errorInfo,
	};
};

/**
 *
 * @param api ApiPromise
 */
const rpcSystemChain = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.chain()
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(res.toJSON(), 'Development');
	const typeResult = expectCorrectType(res.toRawType(), 'Text');

	return {
		methodName: 'chain',
		success: valueResult.success && typeResult.success,
		errorInfo,
	};
};

const rpcSystemChainType = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.chainType()
		.catch((err) => (errorInfo.error = err));
	const expectedJSON = {
		development: null,
	};
	const enumType =
		'{"_enum":{"Development":"Null","Local":"Null","Live":"Null","Custom":"Text"}}';

	const valueResult = expectToBe(res.toJSON(), expectedJSON);
	const enumResult = expectToBe(res.toRawType(), enumType);

	return {
		methodName: 'chainType',
		success: valueResult.success && enumResult.success,
		errorInfo,
	};
};

/**
 * Construct a transaction and then attempt a dry run with an extrinisic to be 'submitted'
 *
 * @param api
 * @returns
 */
const rpcSystemDryRun = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const tx = await constructTx();
	const res = await api.rpc.system
		.dryRun(tx)
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(res.isOk, true);
	const typeResult = expectToBe(res.type, 'Ok');

	return {
		methodName: 'dryRun',
		success: valueResult.success && typeResult.success,
		errorInfo,
	};
};

const rpcSystemHealth = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.health()
		.catch((err) => (errorInfo.error = err));
	const expectedJson = {
		peers: 0,
		isSyncing: false,
		shouldHavePeers: false,
	};
	const enumType =
		'{"peers":"u64","isSyncing":"bool","shouldHavePeers":"bool"}';

	const valueResult = expectToBe(res.toJSON(), expectedJson);
	const enumResult = expectToBe(res.toRawType(), enumType);

	return {
		methodName: 'health',
		success: valueResult.success && enumResult.success,
		errorInfo,
	};
};

const rpcSystemLocalListenAddresses = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.localListenAddresses()
		.catch((err) => (errorInfo.error = err));
	const expectedArray = [
		'/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
		'/ip4/192.168.86.249/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
		'/ip4/192.168.2.1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
		'/ip6/::1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
	];

	const valueResult = expectToInclude(res.toJSON(), expectedArray);
	const typeResult = expectCorrectType(res.toRawType(), 'Vec<Text>');

	return {
		methodName: 'localListenAddresses',
		success: valueResult.success && typeResult.success,
		errorInfo,
	};
};

const rpcSystemLocalPeerId = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.localPeerId()
		.catch((err) => (errorInfo.error = err));

	// These values are specific to running a substrate dev node
	const expectedPrefix = '12D3KooW';
	const expectedAddrTestValue =
		'12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT';

	const valueResult = res.toString().startsWith(expectedPrefix);
	const typeResult = expectCorrectType(res.toRawType(), 'Text');
	const valueLength = expectToBe(
		res.toString().length,
		expectedAddrTestValue.length
	);

	return {
		methodName: 'localPeerId',
		success: valueResult && typeResult.success && valueLength.success,
		errorInfo,
	};
};

const rpcSystemName = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.name()
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(res.toString(), 'Substrate Node');
	const typeResult = expectToBe(res.toRawType(), 'Text');

	return {
		methodName: 'name',
		success: valueResult.success && typeResult.success,
		errorInfo,
	};
};

/**
 * UNSTABLE Automatically fail for now.
 *
 * @param api
 * @returns
 */
const rpcSystemNetworkState = async (api: ApiPromise): Promise<ITestResult> => {
	return {
		methodName: 'networkState',
		success: false,
	};
};

const rpcSystemNodeRoles = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.nodeRoles()
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(res.toString(), '[Authority]');
	const typeResult = expectCorrectType(res.toRawType(), 'Vec<NodeRole>');

	return {
		methodName: 'nodeRoles',
		success: valueResult.success && typeResult.success,
	};
};

const rpcSystemPeers = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.peers()
		.catch((err) => (errorInfo.error = err));

	const valueResult = expectToBe(res.toJSON(), []);
	const typeResult = expectCorrectType(res.toRawType(), 'Vec<PeerInfo>');

	return {
		methodName: 'peers',
		success: valueResult.success && typeResult.success,
	};
};

const rpcSystemProperties = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.properties()
		.catch((err) => (errorInfo.error = err));

	const expectedResult =
		'{"ss58Format":null,"tokenDecimals":null,"tokenSymbol":null}';

	const valueResult = expectToBe(res.toString(), expectedResult);
	const typeResult = expectCorrectType(res.toRawType(), 'Json');

	return {
		methodName: 'properties',
		success: valueResult.success && typeResult.success,
	};
};

const rpcSystemReservedPeers = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.reservedPeers()
		.catch((err) => (errorInfo.error = err));

	const expectedResult = '12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp';

	const valueLength = res.toJSON().length > 0;
	const valueResult = expectToBe(res.toJSON()[0].length, expectedResult.length);
	const typeResult = expectCorrectType(res.toRawType(), 'Vec<Text>');

	return {
		methodName: 'reservedPeers',
		success: valueLength && valueResult.success && typeResult.success,
	};
};

const rpcSystemRemoveReservedPeers = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	// Should we store this value inside of a cache so we dont need to query is again
	const peerAddr = (await api.rpc.system.reservedPeers())[0];
	const res = await api.rpc.system
		.removeReservedPeer(peerAddr)
		.catch((err) => (errorInfo.error = err));

	// Having an empty string returned back denotes that the call was succesful.
	const valueResult = expectToBe(res.toString(), '');

	return {
		methodName: 'removeReservedPeers',
		success: valueResult.success,
	};
};

const rpcSystemResetLogFilter = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.resetLogFilter()
		.catch((err) => (errorInfo.error = err));

	// Value should be an empty string on a succesful call
	const valueResult = expectToBe(res.toString(), '');
	const typeResult = expectCorrectType(res.toRawType(), 'Null');

	return {
		methodName: 'resetLogFilter',
		success: valueResult.success && typeResult.success,
	};
};

const rpcSystemSyncState = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.syncState()
		.catch((err) => (errorInfo.error = err));

	const expectedType =
		'{"startingBlock":"BlockNumber","currentBlock":"BlockNumber","highestBlock":"Option<BlockNumber>"}';

	const jsonResult = res.toJSON();
	const valueResult =
		jsonResult['startingBlock'] === 0 &&
		jsonResult['currentBlock'] > 0 &&
		jsonResult['highestBlock'] === null;
	const typeResult = expectToBe(res.toRawType(), expectedType);

	return {
		methodName: 'syncState',
		success: valueResult && typeResult.success,
	};
};

/**
 * Version will check the type of local machine the node is running. Because it can change
 * per test we make sure that we receive the correct type back from the result.
 *
 * @param api
 * @param errorInfo
 */
const rpcSystemVersion = async (
	api: ApiPromise,
	errorInfo: ErrorInfo = {}
): Promise<ITestResult> => {
	const res = await api.rpc.system
		.version()
		.catch((err) => (errorInfo.error = err));

	const typeResult = expectCorrectType(res.toRawType(), 'Text');

	return {
		methodName: 'version',
		success: typeResult.success,
	};
};
