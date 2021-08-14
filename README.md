## JSONRPsee External Test Suite

This repo aims to add external testing capabilities to all rpc methods, and functionality from substrate. 

As a quick overview, the test suite is completely built from scratch. Meaning, any jest being used is to unit test local code, but for e2e tests of jsonrpsee, that will be managed by the repo itself. All initial code will be tested against the substrate-node, and a polkadot node. 


## RoadMap / Todo

### Basic

- [X] Directory structure
- [X] Fix Eslint config

### Logger

- [X] Basic Logging ie. (`logTestInfo`, `logMessage`, `LogFinalInfo`)
- [ ] Turn `Pass` and `Fail` into colorized constants

### RPC-Methods

Note: Each rpc method should be accompanied by docs explaining the basic expected behavior. It should also be noted that each method will require different constants and logic to check for what would be a successful test. 

- [ ] rpc.author
    - [ ] rpc.author.hasKey
    - [ ] rpc.author.hasSessionKeys
    - [ ] rpc.author.insertKey
    - [ ] rpc.pendingExtrinsics
    - [ ] rpc.removeExtrinsic
    - [ ] rpc.rotateKeys
    - [ ] rpc.submitAndWatchExtrinsic
    - [ ] rpc.submitExtrinsic
- [ ] rpc.chain
    - [ ] rpc.chain.getBlock
    - [ ] rpc.chain.getBlockHash
    - [ ] rpc.chain.getFinalizedHead
    - [ ] rpc.chain.getHeader
    - [ ] rpc.chain.subscribeAllHeads
    - [ ] rpc.chain.subscribeFinalizedHeads
    - [ ] rpc.chain.subscribeNewHeads
- [ ] rpc.offchain
    - [ ] rpc.offchain.localStorageGet
    - [ ] rpc.offchain.localStorageSet
- [ ] rpc.state
    - [ ] rpc.state.call
    - [ ] rpc.state.getChildKeys
    - [ ] rpc.state.getChildReadProof
    - [ ] rpc.state.getChildStorage
    - [ ] rpc.state.getChildStorageHash
    - [ ] rpc.state.getChildStorageSize
    - [ ] rpc.state.getKeys
    - [ ] rpc.state.getKeysPaged
    - [ ] rpc.state.getMetadata
    - [ ] rpc.state.getPairs
    - [ ] rpc.state.getReadProof
    - [ ] rpc.state.getRuntimeVersion
    - [ ] rpc.state.getStorage
    - [ ] rpc.state.getStorageHash
    - [ ] rpc.state.getStorageSize
    - [ ] rpc.state.queryStorage
    - [ ] rpc.state.queryStorageAt
    - [ ] rpc.state.subscribeRuntimeVersion
    - [ ] rpc.state.subscribeStorage
    - [ ] rpc.state.traceBlock
- [ ] rpc.system
    - [ ] DOCS
    - [X] rpc.system.accountNextIndex
    - [X] rpc.system.addLogFilter
    - [X] rpc.system.addReservedPeer
    - [X] rpc.system.chain
    - [X] rpc.system.chainType
    - [X] rpc.system.dryRun
    - [X] rpc.system.health
    - [X] rpc.system.localListenAddresses
    - [X] rpc.system.localPeerId
    - [X] rpc.system.name
    - [ ] rpc.system.networkState (Unstable) Returns false by default
    - [X] rpc.system.nodeRoles
    - [X] rpc.system.peers
    - [X] rpc.system.properties
    - [X] rpc.system.removeReservedPeer
    - [X] rpc.system.reservedPeers
    - [X] rpc.system.resetLogFilter
    - [X] rpc.system.syncState
    - [X] rpc.system.version

### Testing API

- [X] Implement an `expect` API that works similar to Jest, but its main purpose is to deep check received vs expected values and types against each other. 
    - [X] expectToBe
    - [X] expectCorrectType
    - [X] expectToInclude
- [ ] Add error handling. Expected and received results need to be correctly fitted into the workflow along with any error. 

### TODO's

- [ ] Diff between all methods the node has vs the ones we know exists. 

- [X] CLI, 

- [X] Refactor each test suite to use one main function that can take test information from a configuration file

- [ ]  
