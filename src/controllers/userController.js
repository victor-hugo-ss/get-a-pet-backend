import User from '../models/User.js';
import bcrypt from 'bcrypt';
import createUserToken from '../utils/create-user-token.js';

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

        if (!email.includes('@')) {
            return res.status(422).json({ message: 'E-mail inválido!' });
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

        if (password.length < 6) {
            return res.status(422).json({
                message: 'A senha deve ter no mínimo 6 caracteres!',
            });
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
        try {
            const user = await User.create({
                name,
                email: emailNormalized,
                phone,
                password: passwordHash,
            });

            const token = createUserToken(user);

            const response = {
                message: 'Usuário criado e autenticado!',
                token,
                user: {
                    id: user._id,
                    name,
                    email,
                },
            };
            return res.status(201).json(response);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: 'Erro interno do servidor!',
            });
        }
    }
}
