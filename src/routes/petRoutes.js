import { Router } from 'express';
const router = Router();

// Controller
import petController from '../controllers/petController.js';

// Middlewares
import checkToken from '../middlewares/checkToken.js';

router.post('/create', checkToken, petController.create);

export default router;
