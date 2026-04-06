const getToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');

    if (parts.length !== 2) return null;
    return parts[1];
};

export default getToken;
