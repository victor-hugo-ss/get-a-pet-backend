import mongoose from 'mongoose';

export async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI não definida');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado em: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Erro ao conectar ao MongoDB: ${err}`);
        process.exit(1);
    }
}
