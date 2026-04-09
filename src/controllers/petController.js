import Pet from '../models/Pet.js';
import getToken from '../utils/get-token.js';
import getUserByToken from '../utils/get-user-by-token.js';
import { Types } from 'mongoose';
const { ObjectId } = Types;

export default class petController {
    // Criar um pet
    static async create(req, res) {
        const { name, age, weight, color } = req.body;

        const available = true;

        // Validações
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' });
        }

        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatória!' });
        }

        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatório!' });
        }

        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatória!' });
        }

        // Upload de imagens
        if (!req.files || req.files.length === 0) {
            return res.status(422).json({ message: 'A imagem é obrigatória!' });
        }

        const images = req.files.map((image) => image.filename);

        // Dono do pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        // Criar um pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images,
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        });

        try {
            const newPet = await pet.save();
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt');
        res.status(200).json({ pets });
    }

    static async getAllUserPets(req, res) {
        // Obter usuário por token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ 'user._id': user._id }).sort(
            '-createdAt'
        );

        res.status(200).json({ pets });
    }

    static async getAllUserAdoptions(req, res) {
        // Obter usuário por token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ 'adopter._id': user._id }).sort(
            '-createdAt'
        );

        res.status(200).json({ pets });
    }

    static async getPetById(req, res) {
        const id = req.params.id;

        // Checa se o ID é válido
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'ID inválido!' });
        }

        // Checar se o pet existe
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado!' });
        }

        res.status(200).json({ pet });
    }

    static async removePetById(req, res) {
        const id = req.pet._id;
        await Pet.findOneAndDelete(id);

        res.status(200).json({ message: 'Pet removido com sucesso!' });
    }

    static async updatePet(req, res) {
        const { name, age, weight, color, available } = req.body;
        const id = req.pet._id;

        const updatedData = {};

        // Validações
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' });
        } else {
            updatedData.name = name;
        }

        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatória!' });
        } else {
            updatedData.age = age;
        }

        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatório!' });
        } else {
            updatedData.weight = weight;
        }

        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatória!' });
        } else {
            updatedData.color = color;
        }

        // Upload de imagens
        if (!req.files || req.files.length === 0) {
            return res.status(422).json({ message: 'A imagem é obrigatória!' });
        } else {
            const images = req.files.map((image) => image.filename);
            updatedData.images = images;
        }

        await Pet.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: 'Pet atualizado com sucesso!' });
    }
}
