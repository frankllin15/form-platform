export class HttpError extends Error {
  public readonly status: number;
  public readonly errors: string[];
  constructor(status: number, message: string, errors: string[]) {
    super(message);
    this.status = status;
    this.errors = errors;
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
