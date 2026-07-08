import EventoModell from "../models/evento.models.js"

class EventoController {
    static cadastrar(requisicao, resposta) {
        try {
            const { codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas } = requisicao.body
            if (!codigo || !nome || !organizador) {
                return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
            }
            EventoModell.cadastrar(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas)
            resposta.status(201).json({ mensagem: "Evento Agendado com sucesso!" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao Agendar Evento!", erro: error })
        }
    }
    static listarTodos(requisicao, resposta) {
        try {
            const eventos = EventoModell.listarTodos()
            if (eventos.length === 0) {
                return resposta.status(200).json({ mensagem: "Nenhum aluno cadastrado!" })
            }
            resposta.status(200).json(eventos)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar Evento!", erro: error })
        }
    }
    static listarPorCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const evento = EventoModell.listarPorCodigo(codigo)
            if (!evento) {
                resposta.status(200).json({ mensagem: "evento não encontrado " })
            }
            resposta.status(200).json(eventos)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar Evento!", erro: error })
        }
    }
    static atualizarEvento(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { nome, descricao, local, data, horario, organizador, quantidadeVagas } = requisicao.body
            const evento = EventoModell.editar(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas)
            resposta.status(200).json({ mensagem: "evento atualizado com sucesso!" })

        } catch (error) {


            resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error })
        }
    }
    static atualizarParcial(requisicao, resposta) {


    }
}


