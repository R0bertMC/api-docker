const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./empresa.db");

// Criar tabela
db.run(`CREATE TABLE IF NOT EXISTS empresas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  telefone TEXT
)`);

// Cadastrar empresa
app.post("/empresas", (req, res) => {
  const { nome, cnpj, email, telefone } = req.body;
  db.run("INSERT INTO empresas (nome, cnpj, email, telefone) VALUES (?, ?, ?, ?)",
    [nome, cnpj, email, telefone],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.status(201).json({ id: this.lastID });
    }
  );
});

// Listar empresas
app.get("/empresas", (req, res) => {
  db.all("SELECT * FROM empresas", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));