import { ApiPromise } from '@polkadot/api';
import { bool, Bytes, Vec } from '@polkadot/types';
import {
	Extrinsic,
	ExtrinsicStatus,
	H256,
	Hash,
} from '@polkadot/types/interfaces';
import { AnyTuple, IExtrinsic } from '@polkadot/types/types';

import { authorKey, authorKeyType, stateConsts } from '../constants';
import { substrateExtrinsicStatusEnum } from '../responses';
import { RpcMethods } from '../types';
import { constructTx } from '../util/constructTx';
import { expectCorrectType, expectToBe } from '../util/testApi';

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
	rotateKeys: {
		substrateDev: {
			apiCall: async (api: ApiPromise) => await api.rpc.author.rotateKeys(),
			callExpectToBe: (result: Bytes) =>
				expectToBe(result.toRawType(), 'Bytes'),
		},
		polkadotDev: {},
	},
	submitExtrinsic: {
		substrateDev: {
			apiCallTx: async (api: ApiPromise, tx: string) =>
				await api.rpc.author.submitExtrinsic(
					tx as unknown as IExtrinsic<AnyTuple>
				),
			callConstructTx: async (api: ApiPromise) => await constructTx(api),
			callExpectCorrectType: (result: H256) =>
				expectCorrectType(result.toRawType(), 'H256'),
		},
		polkadotDev: {},
	},
	removeExtrinsic: {
		substrateDev: {
			apiCallTx: async (api: ApiPromise, tx: string) => {
				const extrinsicHash = await api.rpc.author.submitExtrinsic(
					tx as unknown as IExtrinsic<AnyTuple>
				);
				const res = await api.rpc.author.removeExtrinsic([
					{ Hash: extrinsicHash },
				]);

				return res;
			},
			callConstructTx: async (api: ApiPromise) => await constructTx(api),
			callExpectToBe: (result: Vec<Hash>) =>
				expectToBe(result.toRawType(), 'Vec<Hash>'),
		},
		polkadotDev: {},
	},
	submitAndWatchExtrinsic: {
		substrateDev: {
			apiCallTx: async (api: ApiPromise, tx: string) =>
				await api.rpc.author.submitAndWatchExtrinsic(
					tx as unknown as IExtrinsic<AnyTuple>
				),
			callConstructTx: async (api: ApiPromise) => await constructTx(api),
			callExpectCorrectType: (result: ExtrinsicStatus) =>
				expectToBe(result.toRawType(), substrateExtrinsicStatusEnum),
		},
		polkadotDev: {},
	},
};
