export type Error = string;

export interface ErrorInfo {
  error?: Error;
  expected?: string | number;
  received?: string | number;
}

export interface IExpectTest {
  success: boolean;
  error?: string;
}
