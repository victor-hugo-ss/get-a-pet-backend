import jwt from 'jsonwebtoken';

const createUserToken = (user) => {
    // Criação de token
    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return token;
};

export default createUserToken;
