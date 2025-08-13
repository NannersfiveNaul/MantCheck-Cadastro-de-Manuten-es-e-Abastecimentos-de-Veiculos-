import { Request, Response } from 'express';
import { ManutencaoService } from '../services/manutencaoService';

export class ManutencaoController {
    private manutencaoService: ManutencaoService;

    constructor(manutencaoService: ManutencaoService) {
        this.manutencaoService = manutencaoService;
    }

    public registrarManutencao = (req: Request, res: Response) => {
        try {
            const manutencaoData = req.body;
            const novaManutencao = this.manutencaoService.adicionarManutencao(manutencaoData);
            return res.status(201).json(novaManutencao);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao registrar manutenção', error });
        }
    };

    public listarManutencoes = (req: Request, res: Response) => {
        try {
            const manutencoes = this.manutencaoService.obterManutencoes();
            return res.status(200).json(manutencoes);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar manutenções', error });
        }
    };
}