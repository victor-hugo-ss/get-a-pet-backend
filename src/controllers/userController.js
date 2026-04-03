import User from '../models/User.js';
import bcrypt from 'bcrypt';

export default class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body;

        // Validações
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' });
        }

        if (!email) {
            return res.status(422).json({ message: 'O e-mail é obrigatório!' });
        }

        if (!phone) {
            return res
                .status(422)
                .json({ message: 'O telefone é obrigatório!' });
        }

        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória!' });
        }

        if (!confirmpassword) {
            return res
                .status(422)
                .json({ message: 'A confirmação de senha é obrigatória!' });
        }

        // Verifica se as senhas são iguais
        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'As senhas não conferem!' });
        }

        // Email normalizado
        const emailNormalized = email.toLowerCase();

        // Verifica se usuário já existe
        const userExists = await User.findOne({ email: emailNormalized });

        if (userExists) {
            return res.status(409).json({ message: 'Email já cadastrado!' });
        }

        // Criar de Senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criar Usuário
        const user = new User({
            name,
            email: emailNormalized,
            phone,
            password: passwordHash,
        });

        try {
            await user.save();
            res.status(201).json({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro interno do servidor!' });
        }
    }
}
