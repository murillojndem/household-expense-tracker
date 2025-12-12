# Roteiro de Apresentação - Teste Técnico (Controle de Gastos)

Este documento serve como guia para a apresentação da solução técnica desenvolvida para o teste de Desenvolvedor Full Stack.

## 1. Introdução (1-2 minutos)
*   **Objetivo:** Apresentar a solução para o sistema de controle de gastos residenciais.
*   **Visão Geral:** O sistema foi desenvolvido separando completamente o Backend (API) do Frontend (SPA), garantindo desacoplamento e escalabilidade.
*   **Tecnologias Principais:**
    *   **Backend:** .NET 8 (ASP.NET Core Web API).
    *   **Frontend:** React 18 + TypeScript + Vite.
    *   **Persistência:** Arquivos JSON (simulando um banco de dados NoSQL simples).

## 2. Arquitetura do Backend (3-4 minutos)
*   **Padrão Arquitetural:** Clean Architecture simplificada (Separação de responsabilidades).
*   **Camadas:**
    1.  **Controllers:** Apenas recebem requisições HTTP e chamam os serviços. Não contêm regras de negócio.
    2.  **Services:** Coração da aplicação. Contêm as validações (ex: menor de idade, tipo de transação) e lógica de negócio.
    3.  **Repositories:** Abstração do acesso aos dados. O Service não sabe como os dados são salvos.
    4.  **Persistence:** Implementação concreta (`JsonDataContext`) que manipula os arquivos físicos.
*   **Destaques Técnicos:**
    *   **Injeção de Dependência:** Uso nativo do container do .NET (`ServiceCollectionExtensions.cs`) para registrar todas as dependências.
    *   **Assincronismo:** Todo o fluxo é `async/await` para não bloquear threads durante I/O de arquivos.
    *   **Tratamento de Erros:** Uso de `try-catch` nos controllers para retornar Status Codes corretos (400 para erros de validação, 404 para não encontrado).

## 3. Arquitetura do Frontend (3-4 minutos)
*   **Estrutura de Pastas:** Feature-based (baseada em funcionalidades).
    *   Cada módulo (`pessoas`, `categorias`, `transacoes`) tem suas próprias pastas de `pages`, `components`, `api` e `types`.
    *   Facilita a manutenção e modularização.
*   **Gerenciamento de Estado:** Uso de Hooks nativos (`useState`, `useEffect`, `useCallback`) para manter a simplicidade, já que a aplicação não exige Redux/Context complexo.
*   **Comunicação com API:**
    *   Configuração de **Proxy** no Vite (`vite.config.ts`) para evitar CORS em desenvolvimento.
    *   Cliente HTTP centralizado (`httpClient.ts`) usando `fetch` nativo, tratando erros e serialização JSON automaticamente.
*   **UX/UI:**
    *   Feedback visual para ações (loading, confirmações de exclusão).
    *   Validações no formulário que refletem as regras de negócio (ex: bloquear "Receita" para menores de 18).

## 4. Demonstração das Regras de Negócio (3-5 minutos)
*   **Cenário 1: Cadastro de Pessoa e Exclusão em Cascata**
    *   Criar uma pessoa.
    *   Criar transações para ela.
    *   Excluir a pessoa e mostrar (via arquivo JSON ou listagem) que as transações sumiram.
    *   *Código:* Mostrar `PessoaService.DeleteAsync`.
*   **Cenário 2: Validação de Menor de Idade**
    *   Tentar cadastrar uma transação de "Receita" para alguém com menos de 18 anos.
    *   Mostrar que o Frontend bloqueia ou o Backend retorna erro.
    *   *Código:* Mostrar `TransacaoService.CreateAsync`.
*   **Cenário 3: Consistência de Categoria**
    *   Tentar lançar uma Despesa com uma categoria que é apenas de Receita.
    *   *Código:* Mostrar validação no Service.

## 5. Relatórios (2 minutos)
*   Mostrar a tela de "Totais por Pessoa".
*   Explicar o cálculo consolidado (Receitas - Despesas = Saldo).
*   Mostrar o totalizador geral no rodapé da tabela.

## 6. Conclusão e Perguntas (1-2 minutos)
*   Reforçar que o código está limpo, sem comentários desnecessários e seguindo os princípios SOLID.
*   A solução é robusta para o escopo proposto, mas preparada para evoluir (ex: trocar JSON por SQL Server seria fácil pois apenas a camada de Persistence/Repository mudaria).
*   Aberto para dúvidas.
