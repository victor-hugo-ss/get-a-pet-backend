import { Router } from 'express';
const router = Router();

// Controller
import petController from '../controllers/petController.js';

router.post('/create', petController.create);

export default router;
