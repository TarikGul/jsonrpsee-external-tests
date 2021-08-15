import { Metadata } from '@polkadot/types';
import { TypeRegistry } from '@polkadot/types';
import substrateMetadataRpc from '@polkadot/types/metadata/v13/toV14';

const createSubstrateRegistry = () => {
    const registry = new TypeRegistry();

    registry.setMetadata(new Metadata(registry, substrateMetadataRpc));

    return registry
}

export const substrateRegistry = createSubstrateRegistry();
