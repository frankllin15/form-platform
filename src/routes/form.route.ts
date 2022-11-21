import { Router } from 'express';
import { FormController } from '../controllers/Form.controller';
import { validade } from '../middleware/validation.middleware';
import { createFormValidator } from '../validators/form.validator';

const router = Router();

router.get('/', FormController.findMany);
router.get('/:id', FormController.findOne);
router.post(
  '/new',
  // validade(createFormValidator),
  FormController.create
);
router.put('/:id', FormController.update);
router.delete('/:id', FormController.delete);

export default router;
