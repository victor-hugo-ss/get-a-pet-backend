import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
