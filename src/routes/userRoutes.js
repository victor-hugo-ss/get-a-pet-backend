import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';

router.post('/register', userController.register);

export default router;
