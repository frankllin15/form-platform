"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, User_controller_1.UserController.getAll);
router.post('/', User_controller_1.UserController.create);
router.put('/:id', User_controller_1.UserController.update);
router.delete('/:id', User_controller_1.UserController.getOne);
exports.default = router;
//# sourceMappingURL=user.route.js.map