import { testRpcAuthor } from "./author";
import { testRpcChain } from "./chain";
import { testRpcOffChain } from "./offchain";
import { testRpcState } from "./state";
import { testRpcSystem } from "./system";

export const tests = [
  testRpcAuthor,
  testRpcChain,
  testRpcOffChain,
  testRpcState,
  testRpcSystem,
];
