import { Router } from 'express';
const router = Router();

// Controller
import petController from '../controllers/petController.js';

// Middlewares
import checkToken from '../middlewares/checkToken.js';
import uploadImage from '../middlewares/uploadImage.js';

router.post(
    '/create',
    checkToken,
    uploadImage('pets').array('images'),
    petController.create
);
router.get('/', petController.getAll);

export default router;
