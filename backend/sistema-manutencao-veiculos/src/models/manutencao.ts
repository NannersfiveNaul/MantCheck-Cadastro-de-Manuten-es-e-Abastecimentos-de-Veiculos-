import mongoose from 'mongoose';

const manutencaoSchema = new mongoose.Schema({
  veiculoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Veiculo', required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },

  data: { type: String, required: true },
  horario: { type: String, required: true },
  odometro: { type: Number, required: true },

  tipo_manutencao: { type: String, enum: ['abastecimento', 'servico'], required: true },

  // Para abastecimento
  combustivel: { type: String },
  preco_unitario: { type: Number },
  valor_total: { type: Number },
  quantidade: { type: Number },

  // Para serviço
  descricao: { type: String },
  valor: { type: Number },

  // Campo opcional para ambos
  local: { type: String },
});

export const Manutencao = mongoose.model('Manutencao', manutencaoSchema);
