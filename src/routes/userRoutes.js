import { Router } from 'express';
const router = Router();

import UserController from '../controllers/UserController.js';
import checkToken from '../middlewares/checkToken.js';

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', checkToken, UserController.checkUser);

export default router;
