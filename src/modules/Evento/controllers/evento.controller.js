import EventoModel from "../models/evento.models.js"

class EventoController {
    static cadastrar(requisicao, resposta) {
        try {
            const { codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas } = requisicao.body
            if (!codigo || !nome || !organizador) {
                return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
            }
            EventoModel.cadastrar(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas)
            resposta.status(201).json({ mensagem: "Evento Agendado com sucesso!" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao Agendar Evento!", erro: error.message })
        }
    }
    static listarTodos(requisicao, resposta) {
        try {
            const eventos = EventoModel.listarTodos()
            if (eventos.length === 0) {
                return resposta.status(200).json({ mensagem: "Nenhum aluno cadastrado!" })
            }
            resposta.status(200).json(eventos)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar Evento!", erro: error.message })
        }
    }
    static listarPorCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const evento = EventoModel.listarPorCodigo(codigo)
            if (!evento) {
                resposta.status(200).json({ mensagem: "evento não encontrado " })
            }
            resposta.status(200).json(eventos)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar Evento!", erro: error.message })
        }
    }
    static atualizarEvento(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas } = requisicao.body
            const evento = EventoModel.atualizarEvento(codigo, novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas)
            if (!evento) {
                return resposta.status(200).json({ mensagem: "evento não encontrado" })
            }

            resposta.status(200).json(evento)


        } catch (error) {


            resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error.message })
        }
    }
    static atualizarParcial(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas } = requisicao.body 
            const evento = EventoModel.editarParcial(codigo, novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas) 
            resposta.status(200).json(evento)
            if (!evento) {
                return resposta.status(200).json({ mensagem: "evento não encontrado" })
            }
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error.message })
        }
    }

    static excluirTodos(requisicao, resposta) {
        try {
            EventoModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todos os eventos foram excluidos" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todos os evento!", erro: error.message })
        }
    }

    static excluirPorCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo

            const evento = EventoModel.excluirPorCodigo(codigo);

            if (!evento) {
                return resposta.status(404), json({ mensagem: "Erro ao excluir o evento!", erro: error.message });
            }
            resposta.status(200).json({ mensagem: "Evento excluido com sucesso!" });

        } catch (error) {
            resposta.status(200).json({ mensagem: "Erro ao excluir evento" })
        }
    }
}


export default EventoController