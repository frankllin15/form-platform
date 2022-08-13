import { Router } from "express";
import { FormController } from "../controllers/Form.controller";

const router = Router();

router.post("/new", FormController.create);

export default router;
