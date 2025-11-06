export interface ClienteDTO {
    idCliente?: number,      // ID do Cliente (? indica um parâmetro opcional)
    nome: string,            // Nome do Cliente
    cpf: string,             // CPF do Cliente
    data_nascimento: Date,   // Data de Nascimento do Cliente
    email: string,           // Email do Cliente
    telefone: string,        // Telefone do Cliente
    situacao?: boolean       // Situação do Cliente
}