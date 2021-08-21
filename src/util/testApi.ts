import { InterfaceTypes } from '@polkadot/types/types';
import { isEqual } from 'lodash';

import { IExpectTestResult } from '../types';

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
