"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.UserController = void 0;
const error_1 = require("./../utils/error");
const user_validator_1 = require("./../validators/user.validator");
const User_service_1 = require("../services/User.service");
const error_2 = require("../utils/error");
const validator_1 = require("../utils/validator");
exports.UserController = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = req.query;
                const users = yield User_service_1.UserService.getAll({
                    take: Number(take),
                    skip: Number(skip),
                });
                return res.status(200).json(users);
            }
            catch (err) {
                const _a = (0, error_2.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                res.status(status).json(error);
            }
        });
    },
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    throw new error_1.HttpError(400, "Required parameter 'id' is missing");
                const user = yield User_service_1.UserService.getOne(id);
                return res.status(200).json(user);
            }
            catch (err) {
                const _a = (0, error_2.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                res.status(status).json(error);
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { isValid, errors } = (0, validator_1.validate)(req.body, user_validator_1.createUserValidator);
                if (!isValid) {
                    throw new error_1.HttpError(400, 'Validation error', errors);
                }
                const user = yield User_service_1.UserService.create(req.body);
                return res.status(201).json(user);
            }
            catch (err) {
                const _a = (0, error_2.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                res.status(status).json(error);
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { isValid, errors } = (0, validator_1.validate)(Object.assign({ id }, req.body), user_validator_1.updateUserValidator);
                if (!isValid) {
                    throw new error_1.HttpError(400, 'Validation error', errors);
                }
                const user = yield User_service_1.UserService.update(Object.assign({ id }, req.body));
                return res.status(200).json(user);
            }
            catch (err) {
                const _a = (0, error_2.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                res.status(status).json(error);
            }
        });
    },
};
//# sourceMappingURL=User.controller.js.map