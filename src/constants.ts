import { substrateRegistry } from './util/registry';

export const ALICE_ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

export const ALICE_TX =
	'0x4d028400d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d01c22cdce19d2510551f822e230d9267fd1df8b143f5d0b6e1a8abed7273e9036f72a41c3055c36f01c3c410174b082de20f4bb96d8308c0144dc2ecc4d5919e83b50100000603008eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4813f6ffffffffff3f01';

export const ALICE_BOOTNODE =
	'/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp';

export const offChainLocalConfig = {
	localGetKey: substrateRegistry.createType('Bytes', 'Test'),
	localSetKey: substrateRegistry.createType('Bytes', 'Test'),
	localSetValue: substrateRegistry.createType('Bytes', 'asd'),
};

export const authorKey = substrateRegistry.createType('Bytes');

export const authorKeyType = substrateRegistry.createType('Text', 'Sr25519');

export const stateConsts = {
	stateKey: substrateRegistry.createType('Bytes', 'mock')
}
