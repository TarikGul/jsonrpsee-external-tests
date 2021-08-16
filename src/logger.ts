import chalk from 'chalk';

import { ErrorInfo } from './types';

const PASS = chalk.green('PASS');
const FAIL = chalk.red('FAIL');
const EXPECTED = chalk.red('expected');
const RECEIVED = chalk.green('received');

export class Logger {
	success: number;
	fails: number;
	errors: ErrorInfo[];

	constructor() {
		this.success = 0;
		this.fails = 0;
		this.errors = [];
	}

	logTestInfo(
		methodName: string,
		isSuccess: boolean,
		errorInfo?: ErrorInfo
	): void {
		console.log(errorInfo)
		if (isSuccess) {
			console.log(`    [${PASS}]: ${methodName}`);
			this.success += 1;
		} else {
			console.log(`    [${FAIL}]: ${methodName}`);

			if (errorInfo && errorInfo?.expected && errorInfo?.received) {
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

	logErrors(methodName: string, error?: string): void {}

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
	}
}
