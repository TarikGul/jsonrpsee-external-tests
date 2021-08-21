import { RpcMethods } from '../types';

export const author: RpcMethods = {
    hasKey: {
        substrateDev: {
            // apiCall: async (api: ApiPromise) => await api.rpc.author.hasKey(authorKey, authorKeyType)
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
}
