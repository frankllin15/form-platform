import { Router } from 'express';
import FormRouter from './form.route';
import UserRouter from './user.route';

const router = Router();

router.use('/forms', FormRouter);
router.use('/users', UserRouter);
export default router;
