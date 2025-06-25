// Importa os módulos necessários
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Conecta (ou cria) o banco de dados SQLite
const db = new sqlite3.Database("./empresa.db");

// Cria a tabela 'empresas' se não existir
db.run(`CREATE TABLE IF NOT EXISTS empresas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  telefone TEXT
)`);

// Rota para cadastrar uma nova empresa
app.post("/empresas", (req, res) => {
  const { nome, cnpj, email, telefone } = req.body;
  db.run(
    "INSERT INTO empresas (nome, cnpj, email, telefone) VALUES (?, ?, ?, ?)",
    [nome, cnpj, email, telefone],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.status(201).json({ id: this.lastID });
    }
  );
});

// Rota para listar todas as empresas cadastradas
app.get("/empresas", (req, res) => {
  db.all("SELECT * FROM empresas", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, '0.0.0.0', () => console.log("Servidor rodando na porta 3000"));