import Medicamento from "../model/Medicamento.js";
import type { Request, Response } from "express";

class MedicamentoController extends Medicamento {

    /**
     * Faz a chamada ao modelo para obter a lista de medicamentos e devolve ao medicamento
     * 
     * @param req Requisição do medicamento
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os medicamentos
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaMedicamentos: Array<Medicamento> | null = await Medicamento.listarMedicamentos();

            return res.status(200).json(listaMedicamentos);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de medicamentos." });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosMedicamento = req.body;

            const respostaModelo = await Medicamento.cadastrarMedicamento(dadosRecebidosMedicamento);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar medicamento." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o medicamento" });
        }
    }

    /**
     * Faz a chamada ao modelo para obter o cliente selecionado e devolve ao cliente
     * 
     * @param req Requisição do medicamento
     * @param res Resposta do servidor
     * @returns (200) Objeto do medicamento selecionado
     * @returns (400) Erro no ID do medicamento
     * @returns (500) Erro na consulta
     */
    static async medicamentoNome(req: Request, res: Response): Promise<Response> {
        try {
            const nomeMedicamento: string = req.params.nome as string;

            if (!nomeMedicamento || nomeMedicamento.trim() == "") {
                return res.status(400).json({ mensagem: "Nome inválido." });
            }

            const respostaModelo = await Medicamento.listarNome(nomeMedicamento);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum medicamento encontrado com o nome fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acesso o modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível recuperar o medicamento." });
        }
    }

    static async medicamentoPrinc_Ativo(req: Request, res: Response): Promise<Response> {
        try {
            const princ_AtivoMedicamento: string = req.params.nome as string;

            if (!princ_AtivoMedicamento || princ_AtivoMedicamento.trim() === "") {
                return res.status(400).json({ mensagem: "Nome inválido." });
            }

            const respostaModelo = await Medicamento.listarPrincipioAtivo(princ_AtivoMedicamento);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum medicamento encontrado com o nome fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acesso o modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível recuperar o medicamento." });
        }
    }
}

export default MedicamentoController;