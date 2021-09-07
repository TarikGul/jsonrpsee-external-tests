import { ApiPromise } from '@polkadot/api';
import { Null } from '@polkadot/types';
import { InterfaceTypes } from '@polkadot/types/types';
import { isEqual } from 'lodash';

import { IExpectTestResult } from '../types';
import {
	ITestResult,
	SubstrateInterfaceTypes,
	TestConfigTuple,
	TestCounter,
} from '../types';

/**
 * @param received The received value from the test
 * @param expected What the received value is expected to equal
 * @returns
 */
export const expectToBe = (
	received: unknown,
	expected: unknown
): IExpectTestResult => {
	const result = {
		success: true,
		errorInfo: {
			error: '',
			received,
			expected,
		},
	};

	// Check primitive types
	if (typeof received !== typeof expected) {
		result.success = false;
		result.errorInfo.error = `Invalid Types: Received is of type ${typeof received}, and Expected is type ${typeof expected}`;

		return result;
	}

	// Check if the values are equal
	if (!isEqual(received, expected)) {
		result.success = false;
		result.errorInfo.error = `Values do not equal eachother!`;

		return result;
	}

	// return true or false
	return result;
};

/**
 * Check to see if the received input is of a correct polkadot-js type
 *
 * @param received
 * @param substrateType
 * @returns
 */
export const expectCorrectType = (
	received: string,
	expected: keyof InterfaceTypes
): IExpectTestResult => {
	const result = {
		success: true,
		errorInfo: {
			error: '',
			received,
			expected,
		},
	};

	if (received !== expected) {
		result.success = false;
		result.errorInfo.error = `Incorrect Types: Received substrate type: ${received}, expected substrate type ${expected}`;
	}

	return result;
};

/**
 * Checks to see if all expected addresses are included within a received
 * array of addresses
 *
 * @param received A received array of strings
 * @param addresses An array of addresses
 * @returns
 */
export const expectToInclude = (
	received: string[],
	addresses: string[]
): IExpectTestResult => {
	const result = {
		success: true,
		errorInfo: {
			error: '',
			received,
			expected: addresses,
		},
	};

	let isCorrect = false;

	addresses.forEach((addr) => {
		received.forEach((res) => {
			if (res.includes(addr)) {
				isCorrect = true;
			}
		});
	});

	if (!isCorrect) {
		result.success = false;
		result.errorInfo.error =
			'Received vector does not share the same values as the given input.';
	}

	return result;
};

/**
 * 
 * @param api ApiPromise
 * @param methodTuple Contains a Tuple, where the first index holds information regarding the 
 * passed in method, and the second index holds the config for the 
 * @param chainType The type of chain we are targeting. 
 */
export const runTest = async (
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

	let result: SubstrateInterfaceTypes;
	let tx: string | undefined;

	/**
	 * Check to see if we need to construct a tx before we make an api call.
	 * If thats the case we run the tx and pass it into the api call.
	 */
	if (chainSpecMethods.callConstructTx) {
		tx = await chainSpecMethods.callConstructTx(api);
	}

	/**
	 * Run the API call
	 *
	 * This first checks if the api call is a subscription which is then called
	 * and the log result for that subscription is returned
	 *
	 * If its not a subscription, then we run the api call and set it to our result
	 */
	if (chainSpecMethods.apiCallSub && chainSpecMethods.isSub) {
		const subResult = await chainSpecMethods.apiCallSub(api);

		if (subResult) {
			testCounter.success += 1;
			logResult.success = true;
		} else {
			testCounter.error += 1;
			logResult.errorInfo = {
				error: 'Subscriptions failed to receive expected results.',
			};
		}

		return logResult;
	} else if (chainSpecMethods && chainSpecMethods.apiCall) {
		// Regular api Call
		result = await chainSpecMethods.apiCall(api);
	} else if (chainSpecMethods && chainSpecMethods.apiCallTx && tx) {
		// Api call that sends a transaction
		result = await chainSpecMethods.apiCallTx(api, tx);
	} else if (chainSpecMethods && chainSpecMethods.apiCallUnknown) {
		// Regular api Call when the return type is unknown
		result = (await chainSpecMethods.apiCallUnknown(api)) as Null;
	} else {
		// console an error, and return false, exiting the test
		logResult.errorInfo = {
			error: `apiCall does not exist in the configuration for ${pallet}.${method}`,
		};
		return logResult;
	}

	/**
	 * Call expecToBe if it exists in the configuration
	 */
	if (chainSpecMethods.callExpectToBe) {
		const res: IExpectTestResult = chainSpecMethods.callExpectToBe(result);

		if (res.success) {
			testCounter.success += 1;
		} else {
			testCounter.error += 1;
			logResult.errorInfo = res.errorInfo;
		}
	}

	/**
	 * Call expectCorrectType if it exists in the configuration
	 */
	if (chainSpecMethods.callExpectCorrectType) {
		const res: IExpectTestResult =
			chainSpecMethods.callExpectCorrectType(result);

		if (res.success) {
			testCounter.success += 1;
		} else {
			testCounter.error += 1;
			logResult.errorInfo = res.errorInfo;
		}
	}

	/**
	 * Call expectToInclude if it exists in the configuration
	 */
	if (chainSpecMethods.callExpectToInclude) {
		const res: IExpectTestResult = chainSpecMethods.callExpectToInclude(result);

		if (res.success) {
			testCounter.success += 1;
		} else {
			testCounter.error += 1;
			logResult.errorInfo = res.errorInfo;
		}
	}

	/**
	 * Check if no tests were ran. If that is the case, the configuration is missing
	 * test calls. ex: callExpectToBe, callExpectCorrectType etc.
	 */
	if (testCounter.success === 0 && testCounter.error === 0) {
		logResult.errorInfo = {
			error: `Configuration for ${pallet}.${method} has no test calls.`,
		};
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
