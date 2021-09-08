export const substrateDevHealthRes = {
	peers: 0,
	isSyncing: false,
	shouldHavePeers: false,
};

export const substrateDevLocalAddresses = [
	'/ip4/127.0.0.1/tcp/30333/p2p/',
	'/ip4/192.168.86.249/tcp/30333/p2p/',
	'/ip4/192.168.2.1/tcp/30333/p2p/',
	'/ip6/::1/tcp/30333/p2p/',
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

export const substrateDevGetMetadataType =
	'{"magicNumber":"u32","metadata":"MetadataAll"}';

export const substrateDevGetReadProofType =
	'{"at":"Hash","proof":"Vec<Bytes>"}';

export const substrateDevGetRuntimeVersionType =
	'{"specName":"Text","implName":"Text","authoringVersion":"u32","specVersion":"u32","implVersion":"u32","apis":"Vec<RuntimeVersionApi>","transactionVersion":"u32"}';

export const substrateExtrinsicStatusEnum =
	'{"_enum":{"Future":"Null","Ready":"Null","Broadcast":"Vec<Text>","InBlock":"Hash","Retracted":"Hash","FinalityTimeout":"Hash","Finalized":"Hash","Usurped":"Hash","Dropped":"Null","Invalid":"Null"}}';

export const substrateTraceBlockEnum =
	'{"_enum":{"TraceError":"TraceError","BlockTrace":"BlockTrace"}}';
