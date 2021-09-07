import { KeyringPair } from '@polkadot/keyring/types';
import { Metadata } from '@polkadot/types';
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { createMetadata, OptionsWithMeta } from '@substrate/txwrapper-polkadot';

/**
 * Signing function. Implement this on the OFFLINE signing device.
 *
 * @param pair - The signing pair.
 * @param signingPayload - Payload to sign.
 */
export function signWith(
	pair: KeyringPair,
	signingPayload: string,
	options: OptionsWithMeta
): string {
	const { registry, metadataRpc } = options;
	const generatedMetadata: Metadata = createMetadata(registry, metadataRpc);

	// Important! The registry needs to be updated with latest metadata, so make
	// sure to run `registry.setMetadata(metadata)` before signing.
	registry.setMetadata(generatedMetadata);

	const { signature } = registry
		.createType('ExtrinsicPayload', signingPayload, {
			version: EXTRINSIC_VERSION,
		})
		.sign(pair);

	return signature;
}
