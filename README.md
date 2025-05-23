# API de Cadastro de Empresas de Vendas

API RESTful desenvolvida em Node.js com Express e SQLite, containerizada com Docker e orquestrada via Docker Compose. Permite cadastrar e listar empresas de vendas.

## Funcionalidades

- **Cadastrar empresa** (`POST /empresas`)
- **Listar empresas** (`GET /empresas`)

### Estrutura esperada por empresa

- `id`: inteiro (autoincremento)
- `nome`: texto (obrigatório)
- `cnpj`: texto (obrigatório, único)
- `email`: texto (obrigatório)
- `telefone`: texto (opcional)

## Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Observação

Os comandos abaixo funcionam em **Windows (PowerShell/CMD)**, **Linux** e no terminal do **VS Code**.

### Passos

1. Clone este repositório e acesse a pasta do projeto.
2. Execute o comando abaixo para subir a aplicação:
   ```sh
   docker compose up -d
   ```
3. A API estará disponível em [http://localhost:3000](http://localhost:3000).

### Testando a API

#### Usando `curl` (Windows CMD, Linux, VS Code)

**Cadastrar uma empresa:**
```sh
curl -X POST http://localhost:3000/empresas -H "Content-Type: application/json" -d "{\"nome\":\"Loja XYZ\", \"cnpj\":\"12345678000100\", \"email\":\"contato@xyz.com\", \"telefone\":\"(11) 90000-0000\"}"
```

**Listar empresas:**
```sh
curl http://localhost:3000/empresas
```

#### Usando PowerShell

**Cadastrar uma empresa:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/empresas -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"nome":"Loja XYZ", "cnpj":"12345678000100", "email":"contato@xyz.com", "telefone":"(11) 90000-0000"}'
```

**Listar empresas:**
```powershell
(Invoke-WebRequest -Uri http://localhost:3000/empresas -Method GET).Content
```

## Estrutura do Projeto

```
minha-api-vendas/
├── app.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── empresa.db (criado automaticamente)
```

## Observações

- O banco de dados `empresa.db` é persistido via volume Docker.
- O código está comentado para facilitar o entendimento.
- Para parar a aplicação, use:
  ```sh
  docker compose down
  ```

---

Desenvolvido para fins acadêmicos.