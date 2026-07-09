import express from 'express'
import EventoController from "../controllers/evento.controller.js";

const router = express.Router();

router.get("/listar", EventoController.listarTodos)
router.post("/cadastrar", EventoController.cadastrar)
router.put("/editar/total/:codigo", EventoController.atualizarEvento)
router.patch("/editar/parcial/:codigo", EventoController.atualizarParcial)
router.delete("/excluir/:codigo", EventoController.excluirPorCodigo)
router.delete("/excluir", EventoController.excluirTodos)

export default router 