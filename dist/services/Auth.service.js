"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.AuthService = {
    verifyToken: (token) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            complete: true,
        });
    },
    createToken: (user) => {
        return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
    },
};
//# sourceMappingURL=Auth.service.js.map