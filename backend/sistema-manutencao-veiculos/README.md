# Sistema de Registro de Manutenção de Veículos

Este projeto é um sistema para registro e gerenciamento de manutenções de veículos, incluindo carros, motos e bicicletas. A aplicação permite registrar novas manutenções, listar manutenções existentes e gerenciar informações sobre os veículos.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **app.ts**: Ponto de entrada da aplicação, configura middleware e define rotas.
  - **controllers/**: Contém os controladores que gerenciam a lógica das requisições.
    - **manutencaoController.ts**: Controlador para gerenciar manutenções.
  - **models/**: Contém as definições dos modelos de dados.
    - **veiculo.ts**: Modelo que representa um veículo.
  - **routes/**: Contém as definições das rotas da aplicação.
    - **manutencaoRoutes.ts**: Configuração das rotas de manutenção.
  - **services/**: Contém a lógica de negócios da aplicação.
    - **manutencaoService.ts**: Serviço para gerenciar manutenções.
  - **types/**: Contém definições de tipos e interfaces.
    - **index.ts**: Interfaces para veículos e manutenções.

## Como Executar

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências com o comando:
   ```
   npm install
   ```
4. Inicie a aplicação com o comando:
   ```
   npm start
   ```

## Tecnologias Utilizadas

- TypeScript
- Node.js
- Express

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.