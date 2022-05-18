import { ApiPromise } from '@polkadot/api';
import { Json } from '@polkadot/types';

import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';

export const syncstate: RpcMethods = {
	genSyncSpec: {
		substrateDev: {
			apiCallUnknown: async (api: ApiPromise) => await api.rpc.syncstate.genSyncSpec(true),
			callExpectToBe: (result: Json) => expectToBe(result.get("lightSyncState"), "fail for now"),
		},
		polkadotDev: {},
	},
};
