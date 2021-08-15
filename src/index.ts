import { ApiPromise, WsProvider } from '@polkadot/api';

import { parseArgs } from './cli';
import { RPC_CHAIN_CONSTS } from './config';
import { Logger } from './logger';
import { IExpectTestResult, IParser, ITestResult } from './types';
import {
	SubstrateInterfaceTypes,
	TestConfigTuple,
	TestCounter,
} from './types/config';

const main = async (wsProvider: string) => {
	const logger = new Logger();
	const parser = parseArgs();

	const testMethods = parseArgInput(parser);

	// The user should input the chaintype
	// default will be substrate dev env
	const api = await ApiPromise.create({
		provider: new WsProvider(wsProvider),
	});

	logger.logInitialize(wsProvider);

	for (const methodTuple of testMethods) {
		const { methodName, success, errorInfo } = await runTest(
			api,
			methodTuple,
			parser.chainType
		);

		logger.logTestInfo(methodName, success, errorInfo);
	}

	logger.logFinalInfo();
};

const parseArgInput = (parser: IParser): TestConfigTuple[] => {
	const { method } = parser;
	const testMethods: TestConfigTuple[] = [];

	const rpcConstsKeys = Object.keys(RPC_CHAIN_CONSTS);

	// This will populate testMethods, and then call all the methods
	if (method) {
		// Retrieve either a whole pallet or just a single method

		const splitMethod: string[] = method.split('.');

		if (splitMethod.length === 1) {
			const pallet: string = splitMethod[0];

			if (!rpcConstsKeys.includes(pallet)) {
				console.error(`${pallet} is not a recognized pallet.`);
			}
			// The arg input is only the pallet, which will retrieve all
			// methods inside of the pallet
			Object.keys(RPC_CHAIN_CONSTS[pallet]).forEach((method) => {
				const testInfo = { pallet, method };
				const methodConfig = RPC_CHAIN_CONSTS[pallet][method];

				testMethods.push([testInfo, methodConfig]);
			});
		} else if (splitMethod.length === 2) {
			// The arg input is a single method, which will retrieve
			// only that one method

			const [pallet, method] = splitMethod;
			const methodInfo = { pallet, method };

			const methodConfig = RPC_CHAIN_CONSTS[pallet][method];

			if (!methodConfig) {
				console.error(`${method} does not exist within pallet: ${pallet}`);
			}

			testMethods.push([methodInfo, methodConfig]);
		} else {
			console.error(`${method} is not in the correct format. ex: system.chain`);
		}
	} else {
		// Retrieve all methods
		rpcConstsKeys.forEach((pallet) => {
			Object.keys(RPC_CHAIN_CONSTS[pallet]).forEach((method) => {
				const methodConfig = RPC_CHAIN_CONSTS[pallet][method];
				const methodInfo = { pallet, method };

				testMethods.push([methodInfo, methodConfig]);
			});
		});
	}

	return testMethods;
};

const runTest = async (
	api: ApiPromise,
	methodTuple: TestConfigTuple,
	chainType: string
): Promise<ITestResult> => {
	const [methodInfo, methodConfig] = methodTuple;
	const { pallet, method } = methodInfo;
	const testCounter: TestCounter = {
		success: 0,
		error: 0,
	};
	const logResult: ITestResult = {
		methodName: method,
		success: false,
		errorInfo: undefined,
	};

	const chainSpecMethods = methodConfig[chainType];

	let result: Promise<SubstrateInterfaceTypes>;
	let tx: string | undefined;

	/**
	 * Check to see if we need to construct a tx before we make an api call.
	 * If thats the case we run the tx and pass it into the api call.
	 */
	if (chainSpecMethods.callConstructTx) {
		tx = await chainSpecMethods.callConstructTx();
	}

	/**
	 * Run the API call
	 *
	 * This first checks if the api call is a subscription which is then called
	 * and the log result for that subscription is returned
	 *
	 * If its not a subscription, then we run the api call and set it to our result
	 */
	if (chainSpecMethods.apiCall && chainSpecMethods.isSub) {
		const subResult: boolean = await chainSpecMethods.apiCall(api, tx);

		if (subResult) {
			testCounter.success += 1;
			logResult.success = true;
		} else {
			testCounter.error += 1;

			// Should log the test failed in the errorInfo
		}

		return logResult;
	} else if (chainSpecMethods && chainSpecMethods.apiCall) {
		result = await chainSpecMethods.apiCall(api, tx);
	} else {
		// console an error, and return false, exiting the test
		console.error(
			`APIcall does not exist in the configuration for ${pallet}.${method}`
		);
		return logResult;
	}

	/**
	 * Call expecToBe if it exists in the configuration
	 */
	if (chainSpecMethods.callExpectToBe) {
		const res: IExpectTestResult = chainSpecMethods.callExpectToBe(result);

		res.success ? (testCounter.success += 1) : (testCounter.error += 1);
	}

	/**
	 * Call expectCorrectType if it exists in the configuration
	 */
	if (chainSpecMethods.callExpectCorrectType) {
		const res: IExpectTestResult =
			chainSpecMethods.callExpectCorrectType(result);

		res.success ? (testCounter.success += 1) : (testCounter.error += 1);
	}

	/**
	 * Call expectToInclude if it exists in the configuration
	 */
	if (chainSpecMethods.callExpectToInclude) {
		const res: IExpectTestResult = chainSpecMethods.callExpectToInclude(result);

		res.success ? (testCounter.success += 1) : (testCounter.error += 1);
	}

	/**
	 * Check if no tests were ran. If that is the case, the configuration is missing
	 * test calls. ex: callExpectToBe, callExpectCorrectType etc.
	 */
	if (testCounter.success === 0 && testCounter.error === 0) {
		console.error(`Configuration for ${pallet}.${method} has no test calls.`);
		return logResult;
	}

	/**
	 * Check the testCounter results and determine if the test was succesful or not
	 */
	if (testCounter.success > 0 && testCounter.error === 0) {
		logResult.success = true;
	}

	return logResult;
};

if (require.main === module) {
	// main("wss://kusama-rpc.polkadot.io").finally(() => process.exit(0));
	main('ws://127.0.0.1:9944').finally(() => process.exit(0));
}
