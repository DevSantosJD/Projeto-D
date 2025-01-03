# Sistema de Agenda

## Introdução

Este é um sistema de agenda que permite aos usuários gerenciarem suas tarefas de forma eficiente. O sistema conta com funcionalidades de autenticação, criação, edição, exclusão e movimentação de tarefas entre diferentes estados (“Concluídas”, “Em Processo/Pendentes”).

## Funcionalidades Principais

### 1. Autenticação

- **Login**: Os usuários devem realizar login para acessar suas tarefas.
- **Segurança**: Sistema com suporte a senhas criptografadas para garantir a segurança dos dados.

### 2. Gerenciamento de Tarefas

#### a. Adicionar Tarefas

Permite criar novas tarefas com os seguintes campos:
- **Título** (obrigatório)
- **Descrição** (opcional)
- **Data de vencimento** (opcional)
- **Prioridade** (baixa, média, alta)

#### b. Editar Tarefas

Altere as informações das tarefas existentes, como:
- **Título**
- **Descrição**
- **Data de vencimento**
- **Estado** (Concluída, Em Processo/Pendente)

#### c. Excluir Tarefas

Permite remover tarefas indesejadas ou que não são mais necessárias.

#### d. Mover Tarefa

Alterar o estado da tarefa entre:
- **Concluídas**
- **Em Processo/Pendentes**

### 3. Listagem e Filtros

- **Visualização de tarefas** em listas separadas por estado.
- **Filtros por**:
  - Data
  - Prioridade
  - Estado

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python - Django, Django REST Framework
- **Banco de Dados**: MySQL
