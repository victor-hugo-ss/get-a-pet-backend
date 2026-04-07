import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Utils
import createUserToken from '../utils/create-user-token.js';
import getUserByToken from '../utils/get-user-by-token.js';
import getToken from '../utils/get-token.js';

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

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(422).json({ message: 'O e-mail é obrigatório!' });
        }

        if (!email.includes('@')) {
            return res.status(422).json({ message: 'E-mail inválido!' });
        }

        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória!' });
        }

        // Email normalizado
        const emailNormalized = email.toLowerCase();

        // Verifica se usuário já existe
        const user = await User.findOne({ email: emailNormalized });

        if (!user) {
            return res
                .status(401)
                .json({ message: 'Não há usuário cadastrado com esse e-mail' });
        }

        // checar a senha
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                message: 'Senha inválida!',
            });
        }

        const token = createUserToken(user);
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }

    static async checkUser(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password');
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
        }

        return res.status(500).json({
            message: 'Erro ao buscar usuário!',
        });
    }

    static async getUserById(req, res) {
        const id = req.params.id;

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(422).json({
                message: 'Usuário não encontrado!',
            });
        }

        res.status(200).json({ user });
    }

    static async editUser(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);

        const { name, email, phone, password, confirmpassword } = req.body;

        // validações

        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' });
        }

        user.name = name;

        if (!email) {
            return res.status(422).json({ message: 'O e-mail é obrigatório!' });
        }

        if (!email.includes('@')) {
            return res.status(422).json({ message: 'E-mail inválido!' });
        }

        const userExists = await User.findOne({ email });

        if (user.email !== email && userExists) {
            return res.status(422).json({
                message: 'Por favor, utilize outro e-mail!',
            });
        }

        user.email = email;

        if (!phone) {
            return res
                .status(422)
                .json({ message: 'O telefone é obrigatório!' });
        }

        user.phone = phone;

        if (password) {
            if (password && password.length < 6) {
                return res.status(422).json({
                    message: 'A senha deve ter no mínimo 6 caracteres!',
                });
            }

            if (password !== confirmpassword) {
                return res.status(422).json({
                    message: 'As senhas não conferem!',
                });
            }
        }

        try {
            const updatedData = {
                name,
                email,
                phone,
            };

            if (req.file) {
                updatedData.image = req.file.filename;
            }

            if (password) {
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(password, salt);
                updatedData.password = passwordHash;
            }

            await User.findOneAndUpdate(user._id, updatedData, {
                returnDocument: 'after',
                runValidators: true,
            });

            return res.status(200).json({
                message: 'Usuário atualizado com sucesso!',
            });
        } catch (error) {
            return res.status(500).json({
                message: error,
            });
        }
    }
}
