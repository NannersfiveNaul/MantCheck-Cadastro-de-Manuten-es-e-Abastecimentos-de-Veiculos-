import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/manutencao-veiculos');
        console.log('✅ Conectado ao MongoDB');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error);
    }
};
