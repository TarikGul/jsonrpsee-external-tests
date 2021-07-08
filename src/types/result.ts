import { ErrorInfo } from './';

export interface ITestResult {
	methodName: string;
	success: boolean;
	errorInfo?: ErrorInfo;
}
