import { Router } from 'express';
const router = Router();

import UserController from '../controllers/userController.js';

// Middleware
import checkToken from '../middlewares/checkToken.js';
import uploadImage from '../middlewares/uploadImage.js';

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', checkToken, UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch(
    '/edit',
    checkToken,
    uploadImage('users').single('image'),
    UserController.editUser
);

export default router;
