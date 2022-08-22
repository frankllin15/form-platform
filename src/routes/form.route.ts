import { Router } from 'express';
import { FormController } from '../controllers/Form.controller';

const router = Router();

router.get('/', FormController.findMany);
router.get('/:id', FormController.findOne);
router.post('/new', FormController.create);
router.put('/:id', FormController.update);
router.delete('/:id', FormController.delete);

export default router;
