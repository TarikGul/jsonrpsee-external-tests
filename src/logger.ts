/* eslint-disable @typescript-eslint/restrict-template-expressions */
import chalk from 'chalk';

import { ErrorInfo } from './types';

const PASS = chalk.green('PASS');
const FAIL = chalk.red('FAIL');
const SKIP = chalk.yellow('SKIP');
const EXPECTED = chalk.red('expected');
const RECEIVED = chalk.green('received');

export class Logger {
	success: number;
	fails: number;
	skipped: number;
	errors: ErrorInfo[];
	pallets: Record<string, boolean>;

	constructor() {
		this.success = 0;
		this.fails = 0;
		this.skipped = 0;
		this.errors = [];
		this.pallets = {};
	}

	logTestInfo(
		methodName: string,
		isSuccess: boolean,
		errorInfo?: ErrorInfo
	): void {
		if (errorInfo && errorInfo.isSkipped) {
			console.log(`    [${SKIP}]: ${methodName}`);
			this.skipped += 1;
		} else if (isSuccess) {
			console.log(`    [${PASS}]: ${methodName}`);
			this.success += 1;
		} else {
			console.log(`    [${FAIL}]: ${methodName}`);

			/**
			 * TODO, this needs to be fixed. I dont think anyone will understand this
			 * logic nor is it good code. It gets the job done but should be updated.
			 */
			if (
				(errorInfo &&
					(errorInfo?.expected || errorInfo?.expected === '') &&
					errorInfo?.received) ||
				typeof errorInfo?.expected === 'number' ||
				typeof errorInfo?.received === 'boolean'
			) {
				this.errors.push(errorInfo);
				console.log(`          ErrorInfo: ${errorInfo.error}`);
				console.log(`          ${EXPECTED}: ${errorInfo.expected}`);
				console.log(`          ${RECEIVED}: ${errorInfo.received}`);
			} else if (errorInfo && errorInfo.error) {
				console.log(`          ErrorInfo: ${errorInfo.error}`);
			}

			this.fails += 1;
		}
	}

	logUnsupportedRpcs(rpcs: string[]): void {
		console.log(`The following rpc calls are not supported for testing:`);
		for (const rpc of rpcs) {
			console.log(`    ${rpc}`);
		}
	}

	logPallet(pallet: string): void {
		if (!this.pallets[pallet]) {
			console.log(`[${pallet.toUpperCase()}]`);

			this.pallets[pallet] = true;
		}
	}

	logInitialize(wsProvider: string): void {
		console.log(`Successfully connected to ${wsProvider}`);
		console.log(`Initializing the JSONRPsee tests`);
	}

	/**
	 * @param msgHeader  The msgHeader is the begining of a log message to denote
	 * the type of message that is about to be broadcasted. Example -> "[HEADER]: <Message>"
	 * @param message The message to be broadcasted after the message header
	 */
	logMessage(msgHeader: string, message: string): void {
		console.log(`[${msgHeader}]: ${message}`);
	}

	logHeader(msgHeader: string): void {
		console.log(`[${msgHeader}]`);
	}

	logFinalInfo(): void {
		console.log(`Total Passed: ${this.success}`);
		console.log(`Total Failed: ${this.fails}`);
		console.log(`Total Skipped: ${this.skipped}`);
	}
}
