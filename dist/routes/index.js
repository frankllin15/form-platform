"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_route_1 = __importDefault(require("./form.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
router.use('/forms', form_route_1.default);
router.use('/users', user_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map