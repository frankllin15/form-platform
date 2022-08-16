import { Router } from "express";
import FormRouter from "./form.route";
const router = Router();

router.use("/forms", FormRouter);

export default router;
