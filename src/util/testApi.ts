import { InterfaceTypes } from '@polkadot/types/types';
import { isEqual } from 'lodash';

import { IExpectTest } from '../types';

/**
 * @param recieved The received value from the test
 * @param expected What the received value is expected to equal
 * @returns
 */
export const expectToBe = (
	recieved: unknown,
	expected: unknown
): IExpectTest => {
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
 *
 * @param received
 * @param substrateType
 * @returns
 */
export const expectCorrectType = (
	received: string,
	substrateType: keyof InterfaceTypes
): IExpectTest => {
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
