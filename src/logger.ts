export class Logger {
  success: number;
  fails: number;

  constructor() {
    this.success = 0;
    this.fails = 0;
  }

  logTestInfo(methodName: string, isSuccess: boolean, message?: string): void {
    const logMessage = message ? message : "";
    if (isSuccess) {
      console.log(`[PASS]: ${methodName} ` + logMessage);
      this.success += 1;
    } else {
      console.log(`[FAIL]: ${methodName} ` + logMessage);
      this.fails += 1;
    }
  }

  /**
   * @param msgHeader  The msgHeader is the begining of a log message to denote
   * the type of message that is about to be broadcasted. Example -> "[HEADER]: <Message>"
   * @param message The message to be broadcasted after the message header
   */
  logMessage(msgHeader: string, message?: string): void {
    const logMessage = message ? message : "";
    console.log(`[${msgHeader}] ` + logMessage);
  }

  logFinalInfo(): void {
    console.log(`Total Passed: ${this.success}`);
    console.log(`Total Failed: ${this.fails}`);
  }
}
