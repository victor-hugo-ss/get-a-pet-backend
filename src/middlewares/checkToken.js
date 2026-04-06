import jwt from 'jsonwebtoken';
import getToken from '../utils/get-token.js';

const checkToken = (req, res, next) => {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Dados do usuário na requisição
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido ou expirado!',
        });
    }
};

export default checkToken;
