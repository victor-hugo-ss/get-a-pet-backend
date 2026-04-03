import express from 'express';
import cors from 'cors';

// Importar Routes

const app = express();

// Midlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.static('public'));

//Routes

export default app;
