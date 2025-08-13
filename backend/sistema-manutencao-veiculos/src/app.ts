import express from 'express';
import cors from 'cors'; // ✅ Import do CORS
import { connectToDatabase } from './database';
import manutencaoRoutes from './routes/manutencaoRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors()); // ✅ CORS antes de qualquer rota
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/manutencao', manutencaoRoutes);

app.get('/', (req, res) => {
  res.send('API de manutenção de veículos está no ar! 🚗🛠️');
});

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
