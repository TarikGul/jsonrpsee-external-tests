import { ApiPromise } from '@polkadot/api';
import { Bytes, Null, Option } from '@polkadot/types';

import * as CONSTANTS from '../constants';
import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';

const {
	offChainLocalConfig: { localSetKey, localSetValue, localGetKey },
} = CONSTANTS;

export const offChain: RpcMethods = {
	localStorageGet: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.offchain.localStorageGet('PERSISTENT', localGetKey),
			callExpectToBe: (result: Option<Bytes>) =>
				expectToBe(result.toRawType(), 'Option<Bytes>'),
		},
		polkadotDev: {},
	},
	localStorageSet: {
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.offchain.localStorageSet(
					'PERSISTENT',
					localSetKey,
					localSetValue
				),
			callExpectToBe: (result: Null) => expectToBe(result.toRawType(), 'Null'),
		},
		polkadotDev: {},
	},
};
