import EventoModel from "../models/evento.models.js"

class EventoController {
    static async cadastrar(requisicao, resposta) {
        try {
            const { codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas } = requisicao.body
            if (!codigo || !nome || !organizador) {
                return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
            }
            const evento = await EventoModel.cadastrar(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas)
            resposta.status(201).json({ mensagem: "Evento Agendado com sucesso!" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao Agendar Evento!", erro: error.message })
        }
    }
    static async listarTodos(requisicao, resposta) {
        try {
            const eventos = await EventoModel.listarTodos()
            if (eventos.length === 0) {
                return resposta.status(200).json({ mensagem: "Nenhum aluno cadastrado!" })
            }
            resposta.status(200).json(eventos.rows);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar Evento!", erro: error.message })
        }
    }
    static async listarPorCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const evento = await EventoModel.listarPorCodigo(codigo)
            if (!evento) {
                resposta.status(200).json({ mensagem: "evento não encontrado " })
            }
            resposta.status(200).json(eventos.rows)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar Evento!", erro: error.message })
        }
    }
    static async atualizarEvento(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas } = requisicao.body
            const evento = await EventoModel.atualizarEvento(codigo, novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas)
            if (!evento) {
                return resposta.status(200).json({ mensagem: "evento não encontrado" })
            }

            resposta.status(200).json(evento.rows)


        } catch (error) {


            resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error.message })
        }
    }
    static async atualizarParcial(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas } = requisicao.body 
            const evento = await EventoModel.editarParcial(codigo, novoNome,novaDescricao,novoLocal,novaData,novoHorario,novoOrganizador,novaquantidadeVagas) 
            resposta.status(200).json(evento.rows)
            if (!evento) {
                return resposta.status(200).json({ mensagem: "evento não encontrado" })
            }
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error.message })
        }
    }

    static async excluirTodos(requisicao, resposta) {
        try { await EventoModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todos os eventos foram excluidos" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todos os evento!", erro: error.message })
        }
    }

    static async excluirPorCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo

            const evento = await EventoModel.excluirPorCodigo(codigo);

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