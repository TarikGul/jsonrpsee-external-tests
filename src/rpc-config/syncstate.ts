import { ApiPromise } from '@polkadot/api';
import { Json } from '@polkadot/types';

import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';

interface ILightSyncState {
	babeEpochChanges: string;
	babeFinalizedBlockWeight: number;
	finalizedBlockHeader: string;
	grandpaAuthoritySet: string;
}

interface IGenSyncSpec extends Json {
	badBlocks: null | string;
	bootNodes: string[];
	chainType: string;
	codeSubstitutes: unknown;
	forkBlocks: unknown | null;
	genesis: { raw: { childrenDefault: unknown; top: unknown } };
	id: string;
	lightSyncState: ILightSyncState;
	name: string;
	properties: null | unknown;
	protocolId: null | string;
	telemetryEndpoints: null | string;
}

export const syncState: RpcMethods = {
	genSyncSpec: {
		substrateDev: {
			apiCallUnknown: async (api: ApiPromise) =>
				await api.rpc.syncstate.genSyncSpec(true),
			callExpectToBe: (result: IGenSyncSpec) => {
				const lightSyncState: ILightSyncState = result.get('lightSyncState');

				if (!lightSyncState) {
					return expectToBe(
						'lightSyncState key was not found inside of the returned Json object',
						true
					);
				}

				const checkBabeEpoch = lightSyncState.babeEpochChanges.startsWith('0x');
				const checkBabeFinalized = !isNaN(
					lightSyncState.babeFinalizedBlockWeight
				);
				const checkFinalizedBlock =
					lightSyncState.finalizedBlockHeader.startsWith('0x');
				const checkGrandpa =
					lightSyncState.grandpaAuthoritySet.startsWith('0x');

				const isTrue =
					checkBabeEpoch &&
					checkBabeFinalized &&
					checkFinalizedBlock &&
					checkGrandpa;
				return expectToBe(isTrue, true);
			},
		},
		polkadotDev: {},
	},
};
