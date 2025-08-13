import express, { Request, Response } from 'express';
import { Veiculo } from '../models/veiculo';
import { Manutencao } from '../models/manutencao';
import { autenticarUsuario } from '../middleware/authMiddleware';

interface AuthRequest extends Request {
  usuarioId?: string;
}

const router = express.Router();

// 🔐 Todas as rotas abaixo exigem login
router.use(autenticarUsuario);

// 📌 Veículos

// ✅ Cadastrar veículo
router.post('/veiculos', async (req: AuthRequest, res: Response) => {
  try {
    const {
      nome, modelo, placa, tipo,
      ano_fabricacao, ano_modelo, chassi, renavam
    } = req.body;

    const novoVeiculo = new Veiculo({
      nome, modelo, placa, tipo,
      ano_fabricacao, ano_modelo, chassi, renavam,
      usuarioId: req.usuarioId
    });

    await novoVeiculo.save();
    res.status(201).json(novoVeiculo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao cadastrar veículo', detalhe: err });
  }
});

// ✅ Listar veículos do usuário logado
router.get('/veiculos', async (req: AuthRequest, res: Response) => {
  try {
    const veiculos = await Veiculo.find({ usuarioId: req.usuarioId });
    res.json(veiculos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar veículos', detalhe: err });
  }
});

// ✅ Buscar veículo por ID
router.get('/veiculos/:id', async (req: AuthRequest, res: Response) => {
  try {
    const veiculo = await Veiculo.findOne({
      _id: req.params.id,
      usuarioId: req.usuarioId,
    });

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado' });
    }

    res.json(veiculo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar veículo', detalhe: err });
  }
});

// ✅ Editar veículo por ID
router.put('/veiculos/:id', async (req: AuthRequest, res: Response) => {
  try {
    const veiculo = await Veiculo.findOneAndUpdate(
      { _id: req.params.id, usuarioId: req.usuarioId },
      req.body,
      { new: true }
    );

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado' });
    }

    res.json(veiculo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao editar veículo', detalhe: err });
  }
});

// ✅ Excluir veículo por ID
router.delete('/veiculos/:id', async (req: AuthRequest, res: Response) => {
  try {
    const veiculo = await Veiculo.findOneAndDelete({
      _id: req.params.id,
      usuarioId: req.usuarioId
    });

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado' });
    }

    res.json({ mensagem: 'Veículo excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir veículo', detalhe: err });
  }
});

// 📌 Manutenções

// ✅ Cadastrar manutenção tipo abastecimento
router.post('/:id/abastecimento', async (req: AuthRequest, res: Response) => {
  try {
    const {
      data, horario, odometro,
      combustivel, preco_unitario, valor_total, quantidade, local
    } = req.body;

    const manutencao = new Manutencao({
      veiculoId: req.params.id,
      usuarioId: req.usuarioId,
      data, horario, odometro,
      tipo_manutencao: 'abastecimento',
      combustivel, preco_unitario, valor_total, quantidade, local
    });

    await manutencao.save();
    res.status(201).json(manutencao);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao cadastrar abastecimento', detalhe: err });
  }
});

// ✅ Cadastrar manutenção tipo serviço
router.post('/:id/servico', async (req: AuthRequest, res: Response) => {
  try {
    const { data, horario, odometro, descricao, valor, local } = req.body;

    const manutencao = new Manutencao({
      veiculoId: req.params.id,
      usuarioId: req.usuarioId,
      data, horario, odometro,
      tipo_manutencao: 'servico',
      descricao, valor, local
    });

    await manutencao.save();
    res.status(201).json(manutencao);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao cadastrar serviço', detalhe: err });
  }
});

// ✅ Listar manutenções de um veículo
router.get('/manutencoes/:veiculoId', async (req: AuthRequest, res: Response) => {
  try {
    const manutencoes = await Manutencao.find({
      veiculoId: req.params.veiculoId,
      usuarioId: req.usuarioId
    });
    res.json(manutencoes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar manutenções', detalhe: err });
  }
});

// ✅ Buscar manutenção por ID (para edição)
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const manutencao = await Manutencao.findOne({
      _id: req.params.id,
      usuarioId: req.usuarioId
    });

    if (!manutencao) {
      return res.status(404).json({ erro: 'Manutenção não encontrada' });
    }

    res.json(manutencao);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar manutenção', detalhe: err });
  }
});

// ✅ Editar manutenção por ID
router.put('/manutencoes/:id', async (req: AuthRequest, res: Response) => {
  try {
    const manutencao = await Manutencao.findOne({
      _id: req.params.id,
      usuarioId: req.usuarioId,
    });

    if (!manutencao) {
      return res.status(404).json({ erro: 'Manutenção não encontrada' });
    }

    Object.assign(manutencao, req.body);
    await manutencao.save();

    res.json({ mensagem: 'Manutenção atualizada com sucesso', manutencao });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao editar manutenção', detalhe: err });
  }
});

// ✅ Excluir manutenção por ID
router.delete('/manutencoes/:id', async (req: AuthRequest, res: Response) => {
  try {
    const manutencao = await Manutencao.findOneAndDelete({
      _id: req.params.id,
      usuarioId: req.usuarioId
    });

    if (!manutencao) {
      return res.status(404).json({ erro: 'Manutenção não encontrada' });
    }

    res.json({ mensagem: 'Manutenção excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir manutenção', detalhe: err });
  }
});

// ✅ Somar gastos de um veículo
router.get('/gastos/:veiculoId', async (req: AuthRequest, res: Response) => {
  try {
    const manutencoes = await Manutencao.find({
      veiculoId: req.params.veiculoId,
      usuarioId: req.usuarioId
    });

    const total = manutencoes.reduce((soma, m) => {
      if (m.tipo_manutencao === 'abastecimento') {
        return soma + (m.valor_total ?? 0);
      } else if (m.tipo_manutencao === 'servico') {
        return soma + (m.valor ?? 0);
      }
      return soma;
    }, 0);

    res.json({ total });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao calcular gastos', detalhe: err });
  }
});

export default router;
