import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user;
};

export default getUserByToken;
