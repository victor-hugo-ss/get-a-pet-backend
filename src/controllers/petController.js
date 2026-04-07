import Pet from '../models/Pet.js';

export default class petController {
    // Criar um pet
    static async create(req, res) {
        res.json({ message: 'Deu certo!' });
    }
}
