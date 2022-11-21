import { Router } from 'express';
import FormRouter from './form.route';
import UserRouter from './user.route';
import QuestionTypeRouter from './questionType.route';

const router = Router();

router.use('/question-types', QuestionTypeRouter);
router.use('/forms', FormRouter);
router.use('/users', UserRouter);

export default router;
