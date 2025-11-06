import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

/*
* Classe Medicamento representa um modelo de medicamento com seus atributos principais (nome, fabricante,
* principio ativo, preço, data de validade e ID).
* Permite criar objetos de medicamento, acessar e modificar seus dados, e consultar informações no banco de dados.
* Inclui métodos estáticos para listar todos os medicamentos ou buscar um medicamento específico pelo ID.
*/
class Medicamento {

    // Atributos
    private idMedicamento: number = 0;
    private nome: string;
    private fabricante: string;
    private princ_ativo: string;
    private preco: number;
    private data_validade: string;

    /**
     * Construtor da classe Medicamento
     * @param _nome Marca de medicamento
     * @param _fabricante Fabricante do medicamento
     * @param _princ_ativo Principio ativo do medicamento
     * @param _preco preco do medicamento
     * @param _data_validade Data de validade do medicamento
     */
    constructor(
        _nome: string,
        _fabricante: string,
        _princ_ativo: string,
        _preco: number,
        _data_validade: string
    ) {
        this.nome = _nome;
        this.fabricante = _fabricante;
        this.princ_ativo = _princ_ativo;
        this.preco = _preco;
        this.data_validade = _data_validade;
    }

    /**
     * Retorna o ID do medicamento
     * @returns ID do medicamento
     */
    public getIdMedicamento(): number {
        return this.idMedicamento;
    }

    /**
     * Atribui um ID ao medicamento
     * @param idMedicamento novo ID
     */
    public setIdMedicamento(idMedicamento: number): void {
        this.idMedicamento = idMedicamento;
    }

    /**
     * Retorna a nome do medicamento
     * @returns Nome do medicamento
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Atribui um nome ao medicamento
     * @param nome novo nome do medicamento
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o fabricante do medicamento
     * @returns Fabricante do medicamento
     */
    public getFabricante(): string {
        return this.fabricante;
    }

    /**
     * Atribui um fabricante ao medicamento
     * @param fabricante novo fabricante do medicamento
     */
    public setFabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }

    /**
     * Retorna o Principio ativo do medicamento
     * @returns Principio ativo do medicamento
     */
    public getPrinc_Ativo(): string {
        return this.princ_ativo;
    }

    /**
     * Atribui um principio ativo ao medicamento
     * @param princ_ativo novo principio ativo do medicamento
     */
    public setPrinc_Ativo(princ_ativo: string): void {
        this.princ_ativo = princ_ativo;
    }

    /**
     * Retorna o preço do medicamento
     * @returns preço do medicamento
     */
    public getPreco(): number {
        return this.preco;
    }

    /**
     * Atribui um preço ao medicamento
     * @param preco novo preço do medicamento
     */
    public setPreco(preco: number): void {
        this.preco = preco;
    }

    /**
     * Retorna a data de validade do medicamento
     * @returns Data de validade do medicamento
     */
    public getData_Validade(): string {
        return this.data_validade;
    }

    /**
     * Atribui uma data de validade ao medicamento
     * @param data_validade nova data de validade do medicamento
     */
    public setData_Validade(data_validade: string): void {
        this.data_validade = data_validade;
    }

    /**
     * Retorna os medicamentos cadastrados no banco de dados
     * @returns Lista com medicamentos cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarMedicamentos(): Promise<Array<Medicamento> | null> {
        try {
            let listaDeMedicamentos: Array<Medicamento> = [];

            const querySelectMedicamentos = `SELECT * FROM Medicamento;`;

            const respostaBD = await database.query(querySelectMedicamentos);

            respostaBD.rows.forEach((medicamentoBD) => {
                const novoMedicamento: Medicamento = new Medicamento(
                    medicamentoBD.nome,
                    medicamentoBD.fabricante,
                    medicamentoBD.princ_ativo,
                    medicamentoBD.preco,
                    medicamentoBD.data_validade
                );

                novoMedicamento.setIdMedicamento(medicamentoBD.id_medicamento);

                listaDeMedicamentos.push(novoMedicamento);
            });

            return listaDeMedicamentos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    /**
     * Insere um medicamento no banco de dados
     * 
     * @param medicamento objeto a ser inserido no banco
     * @returns **true** caso a inserção tenha sido feita, **false** em caso de erro
     */
    static async cadastrarMedicamento(medicamento: MedicamentoDTO): Promise<boolean> {
        try {
            const queryInsertMedicamento = `INSERT INTO clientes (nome, cpf, data_nascimento, email, telefone) VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_medicamento;`;

            const respostaBD = await database.query(queryInsertMedicamento, [
                medicamento.nome,
                medicamento.fabricante,
                medicamento.princ_ativo,
                medicamento.preco,
                medicamento.data_validade
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_medicamento}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async listarNome(nome: string): Promise<Medicamento | null> {
        try {
            const querySelectMedicamento = `SELECT * FROM Medicamento WHERE nome=$1;`;

            const respostaBD = await database.query(querySelectMedicamento, [nome]);

            if (respostaBD.rowCount != 0) {
                const medicamento: Medicamento = new Medicamento(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].fabricante,
                    respostaBD.rows[0].princ_ativo,
                    respostaBD.rows[0].preco,
                    respostaBD.rows[0].data_validade
                );
                medicamento.setNome(respostaBD.rows[0].nome);

                return medicamento;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar medicamento no banco de dados. ${error}`);
            return null;
        }
    }

    static async listarPrincipioAtivo(princ_ativo: string): Promise<Medicamento | null> {
        try {
            const querySelectMedicamento = `SELECT * FROM Medicamento WHERE princ_ativo=$1;`;

            const respostaBD = await database.query(querySelectMedicamento, [princ_ativo]);

            if (respostaBD.rowCount != 0) {
                const medicamento: Medicamento = new Medicamento(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].fabricante,
                    respostaBD.rows[0].princ_ativo,
                    respostaBD.rows[0].preco,
                    respostaBD.rows[0].data_validade
                );
                medicamento.setPrinc_Ativo(respostaBD.rows[0].princ_ativo);

                return medicamento;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar medicamento no banco de dados. ${error}`);
            return null;
        }
    }
}

export default Medicamento;