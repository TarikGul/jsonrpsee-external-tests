import { ApiPromise, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import {
	construct,
	deriveAddress,
	getRegistry,
	methods,
	PolkadotSS58Format,
} from '@substrate/txwrapper-polkadot';

import { signWith } from './helpers';

type Chains = 'kusama' | 'polkadot' | 'westend' | 'statemint' | 'statemine';

/**
 * Entry point of the script. This script assumes a Polkadot node is running
 * locally on `http://localhost:9933`.
 */
export const constructTx = async (api: ApiPromise): Promise<string> => {
	// Wait for the promise to resolve async WASM
	await cryptoWaitReady();
	// Create a new keyring, and add an "Alice" account
	const keyring = new Keyring();
	const alice = keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519');
	const bobAddr = '14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3';

	// Construct a balance transfer transaction offline.
	// To construct the tx, we need some up-to-date information from the node.
	// `txwrapper` is offline-only, so does not care how you retrieve this info.
	// In this tutorial, we simply send RPC requests to the node.
	const [
		signedBlock,
		blockHash,
		genesisHash,
		metadataRpc,
		runtimeVersion,
		nonce,
	] = await Promise.all([
		await api.rpc.chain.getBlock(),
		await api.rpc.chain.getBlockHash(),
		await api.rpc.chain.getBlockHash(0),
		await api.rpc.state.getMetadata(),
		await api.rpc.state.getRuntimeVersion(),
		await api.rpc.system.accountNextIndex(alice.address),
	]);

	const number = signedBlock.block.header.number.toNumber();
	const { specVersion, transactionVersion, specName } = runtimeVersion;

	// Create Polkadot's type registry.
	const registry = getRegistry({
		chainName: 'Polkadot',
		specName: specName.toString() as Chains,
		specVersion: specVersion.toNumber(),
		metadataRpc: metadataRpc.toHex(),
	});

	// Now we can create our `balances.transferKeepAlive` unsigned tx. The following
	// function takes the above data as arguments, so can be performed offline
	// if desired.
	const unsigned = methods.balances.transferKeepAlive(
		{
			value: '20071992547409910',
			dest: bobAddr, // Bob
		},
		{
			address: deriveAddress(alice.publicKey, PolkadotSS58Format.polkadot),
			blockHash: blockHash.toString(),
			blockNumber: number,
			eraPeriod: 64,
			genesisHash: genesisHash.toString(),
			metadataRpc: metadataRpc.toHex(),
			nonce: nonce.toNumber(), // Assuming this is Alice's first tx on the chain
			specVersion: specVersion.toNumber(),
			tip: 0,
			transactionVersion: transactionVersion.toNumber(),
		},
		{
			metadataRpc: metadataRpc.toHex(),
			registry,
		}
	);

	// Construct the signing payload from an unsigned transaction.
	const signingPayload = construct.signingPayload(unsigned, { registry });

	// Sign a payload. This operation should be performed on an offline device.
	const signature = signWith(alice, signingPayload, {
		metadataRpc: metadataRpc.toHex(),
		registry,
	});

	// Serialize a signed transaction.
	const tx = construct.signedTx(unsigned, signature, {
		metadataRpc: metadataRpc.toHex(),
		registry,
	});

	return tx;
};
