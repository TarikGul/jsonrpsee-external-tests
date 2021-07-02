import { ILoggerTestInfoOpt } from './types'

export class Logger {
  success: number;
  fails: number;

  constructor() {
    this.success = 0;
    this.fails = 0;
  }

  logTestInfo(methodName: string, isSuccess: boolean, message?: string, options?: ILoggerTestInfoOpt): void {
    const logMessage = message ? message : "";
    if (isSuccess) {
      console.log(`    [PASS]: ${methodName} ` + logMessage);
      this.success += 1;
    } else {
      console.log(`    [FAIL]: ${methodName} ` + logMessage);
      if (options?.expected && options?.received) {
        console.log(`          expected: ${options.expected}`)
        console.log(`          received: ${options.received}`)
      }
      this.fails += 1;
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
  }
}
