import { Router } from 'express';
import { QuestionTypeController } from '../controllers/QuestionType.controller';
const router = Router();

router.get('/', QuestionTypeController.findMany);
router.post('/', QuestionTypeController.create);

export default router;
