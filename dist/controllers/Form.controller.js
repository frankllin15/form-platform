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
exports.FormController = void 0;
const Form_service_1 = require("../services/Form.service");
const validator_1 = require("../utils/validator");
const form_validator_1 = require("../validators/form.validator");
const error_1 = require("../utils/error");
exports.FormController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { isValid, errors } = (0, validator_1.validate)(payload, form_validator_1.createFormValidator);
                if (!isValid) {
                    throw new error_1.HttpError(400, 'Invalid payload', errors);
                }
                const form = yield Form_service_1.FormService.create(req.body);
                return res.status(201).json(form);
            }
            catch (err) {
                const _a = (0, error_1.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                return res.status(status).json(error);
            }
        });
    },
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const forms = yield Form_service_1.FormService.findMany(req.body);
                const total_items = yield Form_service_1.FormService.totalItems();
                res.status(200).json({
                    forms,
                    total_items,
                });
            }
            catch (e) {
                res.status(400).json({
                    error: {
                        message: e.message,
                    },
                });
            }
        });
    },
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id)
                    throw new Error("Required param missing 'id'");
                const form = yield Form_service_1.FormService.findUnique({ id });
                res.status(200).json({
                    form,
                });
            }
            catch (e) {
                res.status(400).json({
                    error: {
                        message: e.message,
                    },
                });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { data } = req.body;
            try {
                const { isValid, errors } = (0, validator_1.validate)({ id, data }, form_validator_1.updateFormValidator);
                if (!isValid)
                    throw new error_1.HttpError(400, 'Invalid params', errors);
                const form = yield Form_service_1.FormService.update({ id, data });
                res.status(201).json({
                    form,
                });
            }
            catch (err) {
                const _a = (0, error_1.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                return res.status(status).json(error);
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id)
                    throw new error_1.HttpError(400, "Required param missing 'id'");
                yield Form_service_1.FormService.delete({ id });
                res.status(204).end();
            }
            catch (err) {
                const _a = (0, error_1.createErrorResponse)(err), { status } = _a, error = __rest(_a, ["status"]);
                return res.status(status).json(error);
            }
        });
    },
};
//# sourceMappingURL=Form.controller.js.map