"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors || [];
    }
}
exports.HttpError = HttpError;
function createErrorResponse(error) {
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
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=error.js.map