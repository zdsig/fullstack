// importando o modulo express
import express from "express";
import dotenv from "dotenv";

// adicionando as configurações do dotenv
dotenv.config();

// inicialiazar a aplicação express, construir a aplicação
const app = express();

// todo server tem uma porta ou portas
const port = process.env.PORTA;

const produtos = [
  {
    matricula: 1,
    nome: "Coxinha",
    email: 4.99,
  },
];

// Endpoint responsavel por listar todos os produtos
app.get("/listar", (requisicao, resposta) => {
  // tratamento de exceção
  try {
    if (produtos.length === 0) {
      return resposta
        .status(200)
        .json({ mensagem: "Nenhum produto cadastrado!" });
    }
    resposta.status(200).json(produtos);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao listar os produtos!" });
  }
});

// Endpoint responsavel por listar um produto por id
app.get("/listar/:id", (requisicao, resposta) => {
  try {
    const id = parseInt(requisicao.params.id);
    const produto = produtos.find(produto => produto.id === id);
    if (!produto) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    resposta.status(200).json(produto);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao buscar o produto!" });
  }
});

// Endpoint responsavel por cadastrar produtos
app.post("/cadastrar", (requisicao, resposta) => {});

// Endpoint responsavel por atualizar todos os dados de um produto
app.put("/editar", (requisicao, resposta) => {});

// Endpoint responsavel por excluir todos os produtos
app.delete("/excluir", (requisicao, resposta) => {});

// Endpoint responsavel por excluir um produto por id
app.delete("/excluir", (requisicao, resposta) => {});

// minha aplicação ouvindo a porta 3000
app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
