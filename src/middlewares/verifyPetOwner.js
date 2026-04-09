import mongoose from 'mongoose';
import Pet from '../models/Pet.js';
import getToken from '../utils/get-token.js';
import getUserByToken from '../utils/get-user-by-token.js';

const { ObjectId } = mongoose.Types;

export const verifyPetOwner = async (req, res, next) => {
    const { id } = req.params;

    // Checa se o ID é válido
    if (!ObjectId.isValid(id)) {
        return res.status(422).json({ message: 'ID inválido!' });
    }

    // Checar se o pet existe
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado!' });
    }

    // Checa se o pet é do usuário logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(403).json({ message: 'Acesso negado!' });
    }

    // joga o pet no request pra usar depois
    req.pet = pet;
    next();
};
