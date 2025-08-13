import mongoose from 'mongoose';

const veiculoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nome: { type: String, required: true },
  modelo: { type: String, required: true },
  placa: { type: String, required: true },
  tipo: { type: String, required: true },
  ano_fabricacao: { type: Number, required: true },
  ano_modelo: { type: Number, required: true },
  chassi: { type: String },
  renavam: { type: String }
});

export const Veiculo = mongoose.model('Veiculo', veiculoSchema);

