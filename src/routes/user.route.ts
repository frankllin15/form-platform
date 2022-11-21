import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', UserController.getAll);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.getOne);

export default router;
