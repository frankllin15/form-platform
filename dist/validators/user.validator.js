"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = exports.createUserValidator = void 0;
exports.createUserValidator = {
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
};
exports.updateUserValidator = {
    id: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
};
//# sourceMappingURL=user.validator.js.map