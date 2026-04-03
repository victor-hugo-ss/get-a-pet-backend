import express from 'express';
import cors from 'cors';

// Importar Routes
import userRoutes from './routes/userRoutes.js';

const app = express();

// Midlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.static('public'));

//Routes
app.use('/users', userRoutes);

export default app;
