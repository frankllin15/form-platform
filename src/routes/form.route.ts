import { Router } from "express";
import { FormController } from "../controllers/Form.controller";

const router = Router();

router.post("/new", FormController.create);
router.get("/", FormController.findMany);
router.get("/:id", FormController.findOne);

export default router;
