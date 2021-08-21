import { ApiPromise } from '@polkadot/api';
import { Null, StorageKey, Vec, Metadata } from '@polkadot/types';
import {
    KeyValue,
    RuntimeVersion,
    ReadProof
} from '@polkadot/types/interfaces';

import * as CONSTANTS from '../constants';
import * as RESPONSES from '../responses';
import { subscribe } from './subscribe';
import { RpcMethods } from '../types';
import { expectToBe } from '../util/testApi';

const {
    stateConsts: { stateKey },
} = CONSTANTS;

export const state: RpcMethods = {
    call: {
        substrateDev: {},
        polkadotDev: {},
    },
    getKeys: {
        substrateDev: {
            apiCall: async (api: ApiPromise) =>
                await api.rpc.state.getKeys(stateKey),
            callExpectToBe: (result: Vec<StorageKey>) =>
                expectToBe(result.toRawType(), 'Vec<StorageKey>'),
        },
        polkadotDev: {},
    },
    getKeysPaged: {
        substrateDev: {
            apiCall: async (api: ApiPromise) =>
                await api.rpc.state.getKeysPaged(stateKey, 0),
            callExpectToBe: (result: Vec<StorageKey>) =>
                expectToBe(result.toRawType(), 'Vec<StorageKey>'),
        },
        polkadotDev: {},
    },
    getMetadata: {
        substrateDev: {
            apiCall: async (api: ApiPromise) => await api.rpc.state.getMetadata(),
            callExpectCorrectType: (result: Metadata) =>
                expectToBe(result.toRawType(), RESPONSES.substrateDevGetMetadataType),
        },
        polkadotDev: {},
    },
    getPairs: {
        substrateDev: {
            apiCall: async (api: ApiPromise) => await api.rpc.state.getPairs('0x'),
            callExpectToBe: (result: Vec<KeyValue>) =>
                expectToBe(result.toRawType(), 'Vec<KeyValue>'),
        },
        polkadotDev: {},
    },
    getReadProof: {
        substrateDev: {
            apiCall: async (api: ApiPromise) =>
                await api.rpc.state.getReadProof([stateKey]),
            callExpectToBe: (result: ReadProof) =>
                expectToBe(
                    result.toRawType(),
                    RESPONSES.substrateDevGetReadProofType
                ),
        },
        polkadotDev: {},
    },
    getRuntimeVersion: {
        substrateDev: {
            apiCall: async (api: ApiPromise) =>
                await api.rpc.state.getRuntimeVersion(),
            callExpectToBe: (result: RuntimeVersion) =>
                expectToBe(
                    result.toRawType(),
                    RESPONSES.substrateDevGetRuntimeVersionType
                ),
        },
        polkadotDev: {},
    },
    getStorage: {
        substrateDev: {
            apiCallUnknown: async (api: ApiPromise) =>
                await api.rpc.state.getStorage(stateKey),
            callExpectToBe: (result: Null) => expectToBe(result.toJSON(), null),
        },
        polkadotDev: {},
    },
    subscribeRuntimeVersion: {
        substrateDev: {
            apiCallSub: async (api: ApiPromise) =>
                await subscribe(api.rpc.state.subscribeRuntimeVersion, 1, 60),
            isSub: true,
        },
        polkadotDev: {},
    },
    subscribeStorage: {
        substrateDev: {
            apiCallSub: async (api: ApiPromise) =>
                await subscribe(api.rpc.state.subscribeStorage, 2),
            isSub: true,
        },
        polkadotDev: {},
    },
    traceBlock: {
        substrateDev: {},
        polkadotDev: {},
    },
}
