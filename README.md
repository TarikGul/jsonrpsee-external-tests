## JSONRPsee External Test Suite

This is a set of integration tests for JSONRPsee

## Quick Start

Start by running a substrate dev node in the background using the substrate repository
```
target/release/substrate --dev --tmp
```

Setup
```bash
yarn install
```

### There are a few ways to run the tests:

Run all tests
```
yarn start 
```

Run a single rpc pallet
```
yarn start -m system
```

Run a single rpc method
```
yarn start -m system.health
```

The available pallets are currently as follows

- author
- chain
- offChain
- state
- system

`state.call`, and `state.traceBlock` both need a rework and are currently disabled. 

This readme is subject to changes as it is a rough draft. 
