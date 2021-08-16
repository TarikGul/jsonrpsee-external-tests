export type Error = string;

export interface ErrorInfo {
	error?: Error;
	expected?: string | number | unknown;
	received?: string | number | unknown;
}

export interface IExpectTestResult {
	success: boolean;
	errorInfo: ErrorInfo;
}
