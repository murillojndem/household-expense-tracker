# Sistema de Controle de Gastos Residenciais

Este projeto é uma solução completa para o gerenciamento de gastos residenciais, desenvolvido como parte de um teste técnico para vaga de Desenvolvedor Full Stack. O sistema é composto por uma API RESTful em .NET e uma interface moderna em React.

## 📋 Objetivo

Implementar um sistema capaz de gerenciar pessoas, categorias e transações financeiras, garantindo a integridade dos dados e aplicando regras de negócio específicas, como restrições para menores de idade e compatibilidade entre tipos de transação e categorias.

## 🚀 Tecnologias Utilizadas

### Backend
- **C# e .NET 8**: Plataforma de desenvolvimento robusta e performática.
- **ASP.NET Core Web API**: Framework para construção de APIs RESTful.
- **Persistência em JSON**: Sistema de armazenamento de dados em arquivos locais, garantindo persistência entre reinicializações sem a necessidade de um SGBD externo.
- **Injeção de Dependência**: Uso nativo do container do .NET para desacoplamento.
- **Swagger**: Documentação interativa da API.

### Frontend
- **React 18**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Build tool rápida e leve.
- **CSS Modules**: Estilização modular e escopada.
- **Fetch API**: Consumo de dados da API.

## 🏗️ Arquitetura

O projeto foi estruturado seguindo princípios de **Clean Architecture** e separação de responsabilidades:

### Backend
- **Controllers**: Responsáveis apenas por receber as requisições HTTP e retornar as respostas.
- **Services**: Contêm toda a lógica de negócio e validações (ex: regra de menor de idade).
- **Repositories**: Abstraem o acesso aos dados.
- **Persistence**: Implementação concreta do acesso aos arquivos JSON.
- **Models**: Representação das entidades do domínio.

### Frontend
- **Features**: Organização por funcionalidades (Pessoas, Categorias, Transações, Relatórios).
- **Shared**: Componentes, hooks e utilitários reutilizáveis.
- **API**: Camada de serviço para comunicação com o backend.

## ✨ Funcionalidades

1.  **Cadastro de Pessoas**:
    *   Criação, listagem e exclusão.
    *   *Regra*: Ao excluir uma pessoa, todas as suas transações são removidas automaticamente.

2.  **Cadastro de Categorias**:
    *   Criação e listagem.
    *   Definição de finalidade (Despesa, Receita ou Ambas).

3.  **Cadastro de Transações**:
    *   Registro de receitas e despesas.
    *   *Regra*: Menores de 18 anos só podem registrar despesas.
    *   *Regra*: A categoria deve ser compatível com o tipo da transação.

4.  **Relatórios**:
    *   **Totais por Pessoa**: Visão consolidada de receitas, despesas e saldo por pessoa.
    *   **Totais por Categoria**: Visão consolidada por categoria.
    *   Totalizadores gerais do sistema.

## 🔧 Como Executar o Projeto

### Pré-requisitos
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)

### Passo 1: Executar o Backend

1.  Navegue até a pasta da API:
    ```bash
    cd backend/ControleGastos.Api
    ```
2.  Execute o projeto:
    ```bash
    dotnet run
    ```
3.  A API estará disponível em `http://localhost:5230`.
4.  A documentação Swagger pode ser acessada em `http://localhost:5230/swagger`.

### Passo 2: Executar o Frontend

1.  Abra um novo terminal e navegue até a pasta do frontend:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse a aplicação no navegador (geralmente em `http://localhost:3000` ou `http://localhost:5173`).

## 📝 Decisões de Projeto

- **Persistência em Arquivo**: Optou-se por usar arquivos JSON para persistência para simplificar a configuração do ambiente de avaliação, eliminando a necessidade de instalar bancos de dados como SQL Server ou Postgres, mas mantendo a estrutura de repositório pronta para uma futura migração.
- **Frontend sem Redux**: Dado o escopo da aplicação, o gerenciamento de estado foi feito com Hooks nativos do React (`useState`, `useEffect`), evitando complexidade desnecessária.
