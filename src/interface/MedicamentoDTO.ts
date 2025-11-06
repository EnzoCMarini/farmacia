export interface MedicamentoDTO {
    idMedicamento?: number,    // ID do Medicamento
    nome: string,              // Nome do Medicamento
    fabricante: string,        // CPF do Medicamento
    princ_ativo: string;       // Princípio Ativo do Medicamento
    preco: number;             // Preço do Medicamento
    data_validade: Date;       // Data de Validade do Medicamento
    situacao?: boolean         // Situação do Medicamento
}