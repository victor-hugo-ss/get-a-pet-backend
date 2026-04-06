import { Router } from 'express';
const router = Router();

import UserController from '../controllers/UserController.js';

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);

export default router;
