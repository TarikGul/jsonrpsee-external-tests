export type Error = string;

export interface ErrorInfo {
	error?: Error;
	expected?: string | number;
	received?: string | number;
}

export interface IExpectTestResult {
	success: boolean;
	error?: string;
}
