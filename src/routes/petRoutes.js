import { Router } from 'express';
const router = Router();

// Controller
import petController from '../controllers/petController.js';

// Middlewares
import checkToken from '../middlewares/checkToken.js';
import uploadImage from '../middlewares/uploadImage.js';
import { verifyPetOwner } from '../middlewares/verifyPetOwner.js';

router.post(
    '/create',
    checkToken,
    uploadImage('pets').array('images'),
    petController.create
);
router.get('/', petController.getAll);
router.get('/mypets', checkToken, petController.getAllUserPets);
router.get('/myadoptions', checkToken, petController.getAllUserAdoptions);
router.get('/:id', petController.getPetById);
router.delete('/:id', checkToken, petController.removePetById);
router.patch(
    '/:id',
    checkToken,
    verifyPetOwner,
    uploadImage('pets').array('images'),
    petController.updatePet
);

export default router;
