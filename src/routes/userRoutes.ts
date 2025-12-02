import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/', apiLimiter, authenticate, userController.getAllUsers);
router.get('/:id', apiLimiter, authenticate, userController.getUserById);
router.put('/:id', apiLimiter, authenticate, userController.updateUser);
router.delete('/:id', apiLimiter, authenticate, userController.deleteUser);

export default router;
