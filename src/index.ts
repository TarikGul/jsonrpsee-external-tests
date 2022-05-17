import { ApiPromise, WsProvider } from '@polkadot/api';

import { parseArgs } from './cli';
import { skipMethods } from './config.skip';
import { Logger } from './logger';
import { RPC_TEST_CONFIG } from './rpc-config';
import { IParser } from './types';
import { TestConfigTuple } from './types/config';
import { runTest } from './util/testApi';

const main = async (ws: string) => {
	const logger = new Logger();
	const parser = parseArgs();

	const testMethods = parseArgInput(parser);
	// The user should input the chaintype
	// default will be substrate dev env
	const api = await ApiPromise.create({
		provider: new WsProvider(ws),
	});

	logger.logInitialize(ws);

	for (const methodTuple of testMethods) {
		let methodName, success, errorInfo;
		if (skipMethods.includes(methodTuple[0].method)) {
			methodName = methodTuple[0].method;
			success = false;
			errorInfo = { isSkipped: true };
		} else {
			const testResult = await runTest(api, methodTuple, parser.chainType);
			methodName = testResult.methodName;
			success = testResult.success;
			errorInfo = testResult.errorInfo;
		}

		logger.logPallet(methodTuple[0].pallet);
		logger.logTestInfo(methodName, success, errorInfo);
	}

	logger.logFinalInfo();
};

const parseArgInput = (parser: IParser): TestConfigTuple[] => {
	const { method } = parser;
	const testMethods: TestConfigTuple[] = [];

	const rpcConstsKeys = Object.keys(RPC_TEST_CONFIG);

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
			Object.keys(RPC_TEST_CONFIG[pallet]).forEach((method) => {
				const testInfo = { pallet, method };
				const methodConfig = RPC_TEST_CONFIG[pallet][method];

				testMethods.push([testInfo, methodConfig]);
			});
		} else if (splitMethod.length === 2) {
			// The arg input is a single method, which will retrieve
			// only that one method

			const [pallet, method] = splitMethod;
			const methodInfo = { pallet, method };

			const methodConfig = RPC_TEST_CONFIG[pallet][method];

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
			Object.keys(RPC_TEST_CONFIG[pallet]).forEach((method) => {
				const methodConfig = RPC_TEST_CONFIG[pallet][method];
				const methodInfo = { pallet, method };

				testMethods.push([methodInfo, methodConfig]);
			});
		});
	}

	return testMethods;
};

if (require.main === module) {
	// main("wss://kusama-rpc.polkadot.io").finally(() => process.exit(0));
	main('ws://127.0.0.1:9944').finally(() => process.exit(0));
}
