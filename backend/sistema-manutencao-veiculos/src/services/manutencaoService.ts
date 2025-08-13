export class ManutencaoService {
    private manutencoes: any[] = [];

    public adicionarManutencao(manutencao: any): any {
        this.manutencoes.push(manutencao);
        return manutencao;
    }

    public obterManutencoes(): any[] {
        return this.manutencoes;
    }
}