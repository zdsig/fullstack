import eventos from "../../../config/database.js"

class EventoModel {
    static cadastrar(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas) {
        const evento = { codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas }
        alunos.push(evento)
        return evento
    }

    static listarTodos() {
        return eventos
    }

    static listarPorCodigo(codigo) {
        const evento = eventos.find(evento => evento.codigo === codigo)
        return evento
    }

    static editar(codigo, novoNome, novaDescricao, novoLocal, novaData, novoHorario, novoOrganizador, novaquantidadeVagas) {
        const evento = EventoModel.listarPorCodigo(codigo)

        if (!evento) {
            return null
        }

        evento.nome = novoNome 
        evento.descricao = novaDescricao 
        evento.local = novoLocal 
        evento.data = novaData 
        evento.horario = novoHorario 
        evento.organizador = novoOrganizador 
        evento.quantidadeVagas = novaquantidadeVagas 
        return evento
    }

    static editarParcial(codigo, novoNome, novaDescricao, novoLocal, novaData, novoHorario, novoOrganizador, novaquantidadeVagas) {
        const evento = EventoModel.listarPorCodigo(codigo)

        if (!evento) {
            return null
        }

        evento.nome = novoNome || evento.nome
        evento.descricao = novaDescricao || evento.descricao
        evento.local = novoLocal || evento.local
        evento.data = novaData || evento.data
        evento.horario = novoHorario || evento.horario
        evento.organizador = novoOrganizador || evento.organizador
        evento.quantidadeVagas = novaquantidadeVagas || evento.quantidadeVagas

        return evento
    }
    static excluir(codigo) {
        const index = eventos.findIndex(evento => evento.codigo === codigo)

        if (index === -1) {
            return null
        }

        const eventoRemovido = eventos.splice(index, 1)
        return eventoRemovido[0]
    }
    static excluirTodos() {
        eventos.length = 0
    }
}


export default EventoModel