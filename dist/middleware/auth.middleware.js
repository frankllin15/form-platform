"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Auth_service_1 = require("../services/Auth.service");
const error_1 = require("../utils/error");
const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new error_1.HttpError(401, 'Not token provided');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new error_1.HttpError(401, 'Malformed token');
        }
        const user = Auth_service_1.AuthService.verifyToken(token);
        if (!user) {
            throw new error_1.HttpError(401, 'Invalid token');
        }
        req.user = user;
        next();
    }
    catch (err) {
        const _a = (0, error_1.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
        res.status(status).json(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map