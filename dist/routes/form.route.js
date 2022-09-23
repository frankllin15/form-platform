"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Form_controller_1 = require("../controllers/Form.controller");
const router = (0, express_1.Router)();
router.get('/', Form_controller_1.FormController.findMany);
router.get('/:id', Form_controller_1.FormController.findOne);
router.post('/new', Form_controller_1.FormController.create);
router.put('/:id', Form_controller_1.FormController.update);
router.delete('/:id', Form_controller_1.FormController.delete);
exports.default = router;
//# sourceMappingURL=form.route.js.map