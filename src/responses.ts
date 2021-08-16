export const substrateDevHealthRes = {
	peers: 0,
	isSyncing: false,
	shouldHavePeers: false,
};

export const substrateDevLocalAddresses = [
	'/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
	'/ip4/192.168.86.249/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
	'/ip4/192.168.2.1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
	'/ip6/::1/tcp/30333/p2p/12D3KooWSiRgzMbqZz2pA8JGd8t3SW2Eu6bVeqiETowwwrLuLznT',
];

export const substrateDevProperties =
	'{"ss58Format":null,"tokenDecimals":null,"tokenSymbol":null}';

export const substrateDevRemovePeer =
	'12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp';

export const substrateDevSyncStateType =
	'{"startingBlock":"BlockNumber","currentBlock":"BlockNumber","highestBlock":"Option<BlockNumber>"}';

export const substrateDevGetBlockType =
	'{"block":"Block","justifications":"Option<Justifications>"}';

export const substrateDevGetHeaderType =
	'{"parentHash":"Hash","number":"Compact<BlockNumber>","stateRoot":"Hash","extrinsicsRoot":"Hash","digest":"Digest"}';

export const substrateDevGetMetadataType = '{"magicNumber":"u32","metadata":"MetadataAll"}';
