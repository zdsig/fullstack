import conexao from "../../../config/database.js"

class EventoModel {
    static async cadastrar(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas) {
        const values = [codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas]
        const query = `insert into evento (codigo,nome,descricao,local,data,horario,organizador,quantidadeVagas) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`
        const resultado = await conexao.query(query, values)
        return resultado.rows[0]
    }

    static async listarTodos() {

        const query = `select * from evento`
        const resultado = await conexao.query(query)
        return resultado;

    }

    static async listarPorCodigo(codigo) {
        const values = [codigo]
        const query = `select * from evento where codigo = $1`
        const resultado = await conexao.query(query, values)
        return resultado
    }

    static async atualizarEvento(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas) {
        const evento = await EventoModel.listarPorCodigo(codigo);
        if (evento.length === 0) {
            return null;
        }
        const values = [codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas]
        const query = `update evento
            set nome = $2 , descricao = $3
            where codigo = $1 returning `
        const resultado = await conexao.query(query, values)
        return resultado.rows[0]
    }

    static async editarParcial(codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas) {
        const evento = await EventoModel.listarPorCodigo(codigo);
        if (evento.length === 0) {
            return null;
        }
        const values = [codigo, nome, descricao, local, data, horario, organizador, quantidadeVagas]
        const query = `update evento
        set nome = coalesce($2, nome), descricao = coalesce($3, descricao)
        where codigo = $1 returning*;`

        const resultado = await conexao.query(query, values)
        return resultado.rows[0]
    }

    static async excluirPorCodigo(codigo) {
        const evento = await EventoModel.listarPorCodigo(codigo);
        if (evento.length === 0) {
            return null;
        }
        const values = [codigo]
        const query = `delete from aluno where matricula = $1 returning*`
        const resultado = await conexao.query(query, values)
        return resultado.rows[0]
    }

    static async excluirTodos() {
        const query = `delete from evento returning *`
        const resultado = await conexao.query(query)
        return resultado.rows
    }
}

export default EventoModel;