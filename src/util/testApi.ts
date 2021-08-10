import { InterfaceTypes } from '@polkadot/types/types';
import { isEqual } from 'lodash';

import { IExpectTestResult } from '../types';

/**
 * @param recieved The received value from the test
 * @param expected What the received value is expected to equal
 * @returns
 */
export const expectToBe = (
	recieved: unknown,
	expected: unknown
): IExpectTestResult => {
	const result = {
		success: true,
		error: '',
	};

	// Check primitive types
	if (typeof recieved !== typeof expected) {
		result.success = false;
		result.error = `Invalid Types: Recieved is of type ${typeof recieved}, and Expected is type ${typeof expected}`;

		return result;
	}

	// Check if the values are equal
	if (!isEqual(recieved, expected)) {
		result.success = false;
		result.error = `Values do not equal eachother! Received: ${recieved} Expected: ${expected}`;

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
	substrateType: keyof InterfaceTypes
): IExpectTestResult => {
	const result = {
		success: true,
		error: ',',
	};

	if (received !== substrateType) {
		result.success = false;
		result.error = `Incorrect Types: Received substrate type: ${received}, expected substrate type ${substrateType}`;
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
		error: '',
	};

	const isCorrect = addresses.filter((addr) => received.includes(addr));

	if (isCorrect.length > 0) {
		result.success = false;
		result.error =
			'Received vector does not share the same values as the given input.';
	}

	return result;
};
