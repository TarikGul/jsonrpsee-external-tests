import { ApiPromise, WsProvider } from '@polkadot/api';
import { Namespace } from 'argparse';

import { parseArgs } from './cli';
import { RPC_CHAIN_CONSTS } from './config';
import { Logger } from './logger';
import { tests } from './rpc';
import { ITestConfig } from './types/config';

const main = async (wsProvider: string) => {
	const logger = new Logger();
	const parser = parseArgs();

	const testMethods = parseArgInput(parser);

	// The user should input the chaintype
	// default will be substrate dev env

	// const api = await ApiPromise.create({
	// 	provider: new WsProvider(wsProvider),
	// });

	// logger.logInitialize(wsProvider);

	// for (let i = 0; i < tests.length; i++) {
	// 	const callTests = tests[i];
	// 	await callTests(api, logger);
	// }

	// logger.logFinalInfo();
};

const parseArgInput = (parser: Namespace) => {
	const { method } = parser;
	const testMethods: [string, ITestConfig][] = [];

	const rpcConstsKeys = Object.keys(RPC_CHAIN_CONSTS);

	// This will populate testMethods, and then call all the methods
	if (method as string) {
		// Retrieve either a whole pallet or just a single method

		const splitMethod: string[] = method.split('.');

		if (splitMethod.length === 1) {
			const pallet: string = splitMethod[0];

			if (!rpcConstsKeys.includes(pallet)) {
				console.error(`${pallet} is not a recognized pallet.`);
			}
			// The arg input is only the pallet, which will retrieve all
			// methods inside of the pallet
			Object.keys(RPC_CHAIN_CONSTS[splitMethod[0]]).forEach((method) => {
				const methodConfig = RPC_CHAIN_CONSTS[splitMethod[0]][method];

				testMethods.push([method, methodConfig]);
			});
		} else if (splitMethod.length === 2) {
			// The arg input is a single method, which will retrieve
			// only that one method

			const [pallet, method] = splitMethod;

			const methodConfig = RPC_CHAIN_CONSTS[pallet][method];

			if (!methodConfig) {
				console.error(`${method} does not exist within pallet: ${pallet}`)
			}

			testMethods.push([method, methodConfig]);
		} else {
			console.error(
				`${method} is not in the correct format. ex: system.chain`
			);
		}
	} else {
		// Retrieve all methods
		rpcConstsKeys.forEach((pallet) => {
			Object.keys(RPC_CHAIN_CONSTS[pallet]).forEach((method) => {
				const methodConfig = RPC_CHAIN_CONSTS[pallet][method];

				testMethods.push([method, methodConfig]);
			});
		});
	}
	console.log(testMethods);
};

if (require.main === module) {
	// main("wss://kusama-rpc.polkadot.io").finally(() => process.exit(0));
	main('ws://127.0.0.1:9944').finally(() => process.exit(0));
}
