# Food Explorer - Backend

Este repositório contém o serviço de API backend para a aplicação Food Explorer, fornecendo um conjunto abrangente de endpoints para suportar operações de gerenciamento de restaurante.

## Visão Geral da Aplicação

A API Food Explorer serve como base para um sistema de gerenciamento de restaurante, lidando com diversos aspectos, incluindo:

- Autenticação de usuários e controle de acesso baseado em funções (admin/cliente)
- Gerenciamento de cardápio e pratos, com capacidade de upload de imagens
- Processamento e rastreamento de pedidos
- Processamento de pagamentos
- Funcionalidade de pratos favoritos para usuários

O backend foi construído com Node.js e Express, utilizando SQLite para persistência de dados através do Knex.js como query builder.

## Requisitos de Instalação

### Pré-requisitos
- Node.js (v14.x ou superior)
- NPM (v6.x ou superior)

### Configuração do Ambiente

1. Clone este repositório:
```sh
git clone https://github.com/seu-usuario/food-explorer-backend.git
cd food-explorer-backend
```

2. Instale as dependências:
```sh
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo .env.example para .env
   - Configure as variáveis de acordo com seu ambiente:
```
AUTH_SECRET=sua_chave_secreta_jwt
FRONTEND_URL=http://seu-frontend-url
FRONTEND_DEV_URL=http://seu-frontend-dev-url
AUTH_EXPIRES=1d
COOKIE_MAX_AGE=1d
PORT=3333
```

4. Inicialize o banco de dados:
```sh
npm run migrate
```

### Executando a Aplicação

#### Modo de desenvolvimento:
```sh
npm run dev
```

#### Modo de produção:
```sh
npm start
```

## Referência da API

### Autenticação

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| POST | `/sessions` | Criar uma nova sessão (login) | Público |
| DELETE | `/sessions` | Encerrar uma sessão (logout) | Autenticado |
| GET | `/sessions/verify` | Verificar status de autenticação | Autenticado |

### Usuários

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| POST | `/users` | Criar um novo usuário | Público |
| GET | `/users/list/:list` | Listar usuários por função | Admin |
| DELETE | `/users/:id` | Deletar um usuário | Admin |
| PUT | `/users` | Atualizar informações do usuário | Admin/Cliente (próprio) |

### Pratos

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| GET | `/dishes` | Listar todos os pratos | Autenticado |
| GET | `/dishes/search` | Buscar pratos | Autenticado |
| POST | `/dishes` | Criar um novo prato | Admin |
| PUT | `/dishes` | Atualizar informações do prato | Admin |
| DELETE | `/dishes/:id` | Deletar um prato | Admin |
| PATCH | `/dishes/image` | Fazer upload de imagem do prato | Admin |

### Pedidos

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| GET | `/orders` | Listar pedidos | Admin/Cliente (próprio) |
| POST | `/orders` | Criar um novo pedido | Autenticado |
| PUT | `/orders` | Atualizar informações do pedido | Admin/Cliente (próprio) |
| DELETE | `/orders/:id` | Deletar um pedido | Admin |

### Itens de Pedido

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| GET | `/orders/itens/:id` | Listar itens de um pedido | Admin/Cliente (próprio) |
| POST | `/orders/itens` | Adicionar item ao pedido | Admin/Cliente |

### Favoritos

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| GET | `/favorites` | Listar pratos favoritos do usuário | Autenticado |
| POST | `/favorites/:dish_id` | Adicionar um prato aos favoritos | Autenticado |
| DELETE | `/favorites/:dish_id` | Remover um prato dos favoritos | Autenticado |

### Pagamentos

| Método | Endpoint | Descrição | Função |
|--------|----------|-----------|--------|
| GET | `/payments/:order_id` | Listar pagamentos de um pedido | Admin/Cliente (próprio) |
| POST | `/payments` | Criar um pagamento | Admin/Cliente |
| PUT | `/payments` | Atualizar informações do pagamento | Admin/Cliente (próprio) |
| DELETE | `/payments/:id` | Deletar um pagamento | Admin/Cliente (próprio) |

## Esquema do Banco de Dados

A aplicação utiliza SQLite com as seguintes tabelas principais:
- users: Contas de usuário e autenticação
- dishes: Itens do cardápio do restaurante
- dish_ingredients: Ingredientes para cada prato
- dish_favorites: Pratos favoritos do usuário
- orders: Pedidos dos clientes
- order_itens: Itens dentro de cada pedido
- payment: Registros de pagamento para pedidos

O esquema do banco de dados é gerenciado através das migrações do Knex.js encontradas em migrations.

# Deploy
O deploy da aplicação esta disponível no endereço:

### Credenciais para teste

Para testar a aplicação, você pode utilizar as seguintes credenciais:

**Admin:**
- Email: admin@foodexplorer.com
- Senha: fplxAdmin001

**Cliente:**
- Email: cliente@email.com
- Senha: fplxClient002


## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/csrprojects/FoodExplorerBackend/blob/main/LICENSE.md) para mais detalhes.) para mais detalhes.