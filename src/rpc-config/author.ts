import { ApiPromise } from '@polkadot/api';
import { bool, Bytes } from '@polkadot/types';

import { authorKey, authorKeyType, stateConsts } from '../constants';
import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';

export const author: RpcMethods = {
	hasKey: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.author.hasKey(authorKey, authorKeyType),
			callExpectToBe: (result: bool) => expectToBe(result.toRawType(), 'bool'),
		},
		polkadotDev: {},
	},
	hasSessionKeys: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.author.hasSessionKeys(stateConsts.stateKey),
			callExpectToBe: (result: bool) => expectToBe(result.toRawType(), 'bool'),
		},
		polkadotDev: {},
	},
	insertKey: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.author.insertKey('ed25', '//Alice', authorKey),
			callExpectToBe: (result: Bytes) =>
				expectToBe(result.toRawType(), 'Bytes'),
		},
		polkadotDev: {},
	},
	pendingExtrinsics: {
		substrateDev: {},
		polkadotDev: {},
	},
	removeExtrinsic: {
		substrateDev: {},
		polkadotDev: {},
	},
	rotateKeys: {
		substrateDev: {},
		polkadotDev: {},
	},
	submitAndWatchExtrinsic: {
		substrateDev: {},
		polkadotDev: {},
	},
	submitExtrinsic: {
		substrateDev: {},
		polkadotDev: {},
	},
};
