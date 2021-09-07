import { ApiPromise } from '@polkadot/api';
import { bool, Bytes, Vec } from '@polkadot/types';
import { Extrinsic, H256, ExtrinsicStatus } from '@polkadot/types/interfaces';
import { IExtrinsic, AnyTuple } from '@polkadot/types/types';

import { authorKey, authorKeyType, stateConsts } from '../constants';
import { substrateExtrinsicStatusEnum } from '../responses';
import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';
import { constructTx } from '../util/constructTx';

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
		substrateDev: {
			apiCall: async (api: ApiPromise) =>
				await api.rpc.author.pendingExtrinsics(),
			callExpectToBe: (result: Vec<Extrinsic>) =>
				expectToBe(result.toRawType(), 'Vec<Extrinsic>'),
		},
		polkadotDev: {},
	},
	removeExtrinsic: {
		substrateDev: {},
		polkadotDev: {},
	},
	rotateKeys: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.author.rotateKeys(),
			callExpectToBe: (result: Bytes) =>
				expectToBe(result.toRawType(), 'Bytes'),
		},
		polkadotDev: {},
	},
	submitAndWatchExtrinsic: {
		substrateDev: {
			apiCallTx: async (api: ApiPromise, tx: string) =>
				await api.rpc.author.submitAndWatchExtrinsic(
					(tx as unknown) as IExtrinsic<AnyTuple>
				),
			callConstructTx: async () => await constructTx(),
			callExpectCorrectType: (result: ExtrinsicStatus) => expectToBe(result.toRawType(), substrateExtrinsicStatusEnum)
		},
		polkadotDev: {},
	},
	submitExtrinsic: {
		substrateDev: {
			apiCallTx: async (api: ApiPromise, tx: string) =>
				await api.rpc.author.submitExtrinsic(
					(tx as unknown) as IExtrinsic<AnyTuple>
				),
			callConstructTx: async () => await constructTx(),
			callExpectCorrectType: (result: H256) => expectToBe(result.toRawType(), 'H256')
		},
		polkadotDev: {},
	},
};
