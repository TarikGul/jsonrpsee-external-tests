import { ApiPromise } from '@polkadot/api';
import { bool } from '@polkadot/types'
import { RpcMethods } from '../types';

import { authorKey, authorKeyType } from '../constants';
import { expectToBe } from '../util/testApi';

export const author: RpcMethods = {
	hasKey: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.author.hasKey(authorKey, authorKeyType),
			callExpectToBe: (result: bool) => expectToBe(result.toRawType(), 'bool')
		},
		polkadotDev: {},
	},
	hasSessionKeys: {
		substrateDev: {
			// apiCall: async (api: ApiPromise) => await api.rpc.author.hasSessionKeys(stateKey),
			// callExpectToBe: (result: bool) => expectToBe(result.toRawType(), 'bool')
		},
		polkadotDev: {},
	},
	insertKey: {
		substrateDev: {},
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
