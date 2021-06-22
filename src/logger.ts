export class Logger {
    success: number;
    fails: number;

    constructor() {
        this.success = 0;
        this.fails = 0;
    }

    logTestInfo(methodName: string, isSuccess: boolean, message?: string) {
        const logMessage = message ? message : '';
        if (isSuccess) {
            console.log(`[PASS]: ${methodName} ` + logMessage)
            this.success += 1
        } else {
            console.log(`[Failed]: ${methodName} ` + logMessage)
            this.fails += 1
        }
    }

    logFinalInfo() {
        console.log(`Total Passed: ${this.success}`);
        console.log(`Total Failed: ${this.fails}`);
    }
}
