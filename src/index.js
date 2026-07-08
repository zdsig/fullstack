import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json())


const port = process.env.PORTA;

const eventos = []

app.get("/", (requisicao, resposta) => {
  try {
    resposta.status(200).json({
      mensagem: "API funcionando com sucesso!",
      status: "ok",
      date: new Date().toLocaleString("pt-BR", { timeZone: "America/Recife" })
    })
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao subir o servidor!", erro: error.mensagem });
  }

})


app.get("/listar", (requisicao, resposta) => {

  try {
    if (eventos.length === 0) {
      return resposta
        .status(200)
        .json({ mensagem: "Nenhum evento cadastrado!" });
    }
    resposta.status(200).json(eventos);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao listar eventos!", erro: error });
  }
});


app.get("/listar/:codigo", (requisicao, resposta) => {
  try {
    const codigo = (requisicao.params.codigo);
    const eventos = eventos.find(evento => evento.codigo === codigo);
    if (!evento) {
      return resposta.status(404).json({ mensagem: "evento não encontrado!" });
    }
    resposta.status(200).json(evento);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao buscar eventos agendados!" });
  }
});


app.post("/cadastrar", (requisicao, resposta) => {
  try {
    const { codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas } = requisicao.body

    const dados = { codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas }

    if (!codigo || !nome || !organizador) {
      return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
    }
    eventos.push(dados)
    resposta.status(201).json({ mensagem: "Evento Agendado com sucesso!" })
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao Agendar Evento!", erro: error })
  };

});


app.patch("/editar/:codigo", (requisicao, resposta) => {
  try {
    const codigo = requisicao.params.codigo
    const evento = eventos.find(evento => evento.codigo === codigo)
    if (!evento) {
      return resposta.status(404).json({ mensagem: "Evento não encontrado!" })
    }
    const { novoNome, novaDescricao, novoLocal, novaData, novoHorario, novoOrganizador, novaquantidadeVagas } = requisicao.body
    n
    evento.nome = novoNome || evento.nome
    evento.descricao = novaDescricao || evento.descricao
    evento.local = novoLocal || evento.local
    evento.data = novaData || evento.data
    evento.horario = novoHorario || evento.horario
    evento.organizador = novoOrganizador || evento.organizador
    evento.quantidadeVagas = novaquantidadeVagas || evento.quantidadeVagas

    resposta.status(200).json({ mensagem: "evento atualizado com sucesso!" })
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error })
  }
})

app.put("/editar/todos/:codigo", (requisicao, resposta) => {
  try {
    const codigo = requisicao.params.codigo
    const evento = eventos.find(evento => evento.codigo === codigo)
    if (!evento) {
      return resposta.status(404).json({ mensagem: "evento não Encontrado!" })
    }

    const { novoNome, novaDescricao, novoLocal, novaData, novoHorario, novoOrganizador, novaquantidadeVagas } = requisicao.body

    if (!novaDescricao || !novoNome || !novoLocal || !novaData || !novoHorario || !novoOrganizador || !novaquantidadeVagas) {
      return resposta.status(400).json({ mensagem: "Todos os campos prescisam estar preenchidos!" })
    };

    evento.nome = novoNome
    evento.descricao = novaDescricao
    evento.local = novoLocal
    evento.data = novaData
    evento.horario = novoHorario
    evento.organizador = novoOrganizador
    evento.quantidadeVagas = novaquantidadeVagas
    resposta.status(200).json({ mensagem: "Evento Editado com sucesso!" })

  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao editar Evento!", erro: error })
  }
});


app.delete("/excluir/todos", (requisicao, resposta) => {
  try {
    eventos.length = 0
    resposta.status(200).json({ mensagem: "Todos os Eventos foram excluidos!" })
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao exluir Eventos", erro: error })
  }
});


app.delete("/excluir/:codigo", (requisicao, resposta) => {
  try {
    const codigo = requisicao.params.codigo
    const index = eventos.findIndex(evento => evento.codigo === codigo)
    if (index === -1) {
      return resposta.status(400).json({ mensagem: "Evento não Encontrado!" })
    }
    eventos.splice(index, 1)
    resposta.status(200).json({ mensagem: " Evento excluido!" })
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao exluir Evento", erro: error })
  }


});


app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
