export interface VeiculoInterface {
    id: number;
    tipo: 'carro' | 'moto' | 'bicicleta';
    marca: string;
    modelo: string;
    ano: number;
}

export interface ManutencaoInterface {
    id: number;
    veiculoId: number;
    data: Date;
    descricao: string;
    custo: number;
}