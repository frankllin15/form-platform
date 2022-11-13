import { isValidJson } from './isValid';

export class HttpError extends Error {
  public readonly status: number;
  public readonly errors: string[];
  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.status = status;
    this.errors = errors || [];
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  public toJson() {
    const isValid = isValidJson(this.message);

    return {
      status: this.status,
      message: isValid ? JSON.parse(this.message) : this.message,
      errors: this.errors,
      stack: this.stack,
    };
  }
}

export function createErrorResponse(error: any) {
  if (error instanceof HttpError) {
    return {
      message: error.message,
      errors: error.errors,
      status: error.status,
    };
  }
  return {
    message: error.message,
    status: 500,
  };
}

export function errorToJson(error: any) {
  if (error instanceof HttpError) {
    return error.toJson;
  }
  if (error instanceof Error) {
    return {
      message: isValidJson(error.message)
        ? JSON.parse(error.message)
        : error.message,
    };
  }
  return error;
}
