import { Router } from "express";
import FormRouter from "./form.route";
const router = Router();

router.use("/form", FormRouter);

export default router;
