import { substrateRegistry } from './registry';
import { expectCorrectType, expectToBe, expectToInclude } from './testApi';

describe('Run TestApi', () => {
	describe('expectToBe', () => {
		it('Result should be unsuccessful when primitive types dont match', () => {
			const received = 'mock',
				expected = 10,
				errorMessage = `Invalid Types: Received is of type ${typeof received}, and Expected is type ${typeof expected}`;

			const expectedResponse = {
				success: false,
				errorInfo: {
					error: errorMessage,
					expected,
					received,
				},
			};

			expect(expectToBe(received, expected)).toStrictEqual(expectedResponse);
		});
	});

	describe('expectCorrectType', () => {
		it('Should be unsuccessful when interface types dont match', () => {
			const index = substrateRegistry.createType('Index', 10);

			const received = index.toRawType(),
				expected = 'u64',
				errorMessage = `Incorrect Types: Received substrate type: ${received}, expected substrate type ${expected}`;

			const expectedResponse = {
				success: false,
				errorInfo: {
					error: errorMessage,
					expected,
					received,
				},
			};

			expect(expectCorrectType(received, expected)).toStrictEqual(
				expectedResponse
			);
		});
	});

	describe('expectToInclude', () => {
		it('Should be unsuccessful when received array is not inlcude in the addresses', () => {
			const received = ['ws://abc', 'ws://def', 'ws://ghi'],
				addresses = ['http://abc', 'http://def', 'http://ghi'],
				errorMessage =
					'Received vector does not share the same values as the given input.';

			const expectedResponse = {
				success: false,
				errorInfo: {
					error: errorMessage,
					received,
					expected: addresses,
				},
			};

			expect(expectToInclude(received, addresses)).toStrictEqual(
				expectedResponse
			);
		});
	});
});
