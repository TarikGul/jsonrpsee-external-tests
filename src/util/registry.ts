import { Metadata } from '@polkadot/types';
import { TypeRegistry } from '@polkadot/types';
import { polkadotV9220 } from './metadata/polkadotV9220';

const createSubstrateRegistry = () => {
	const registry = new TypeRegistry();

	registry.setMetadata(new Metadata(registry, polkadotV9220));

	return registry;
};

export const substrateRegistry = createSubstrateRegistry();
