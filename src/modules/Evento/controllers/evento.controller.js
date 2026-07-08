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
            const evento = EventoModell.atualizarEvento(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas)
            resposta.status(200).json(evento)


        } catch (error) {


            resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error })
        }
    }
    static atualizarParcial(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { nome, descricao, local, data, horario, organizador, quantidadeVagas } = requisicao.body
            const evento = EventoModell.editarParcial(nome, descricao, local, data, horario, organizador, quantidadeVagas)
            resposta.status(200).json(evento)
            
        } catch (error) {
             resposta.status(500).json({ mensagem: "Erro ao editar evento!", erro: error })
        }
    }

    static excluirTodos(requisicao, resposta){
        try {
            EventoModell.excluirTodos()
            resposta.status(200).json({mensagem: "Todos os eventos foram excluidos"})

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todos os evento!", erro: error })
        }
    }
    static excluirPorCodigo(requisicao,resposta){
        try {
            // localhost:3000/listar/codigo
            const codigo = requisicao.params.codigo
            EventoModell.excluirPorCodigo()
            resposta.status(200).json({mensagem: "Evento exclido com sucesso!"})
        } catch (error) {
            resposta.status(200).json({mensagem: "Erro ao excluir evento"})
        }
    }
}


export default EventoController