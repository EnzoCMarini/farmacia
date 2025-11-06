 CREATE TABLE Clientes (
    id_cliente INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    data_nascimento DATE NOT NULL,
	nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
	telefone VARCHAR(20)
);

CREATE TABLE Medicamento (
    medicamento_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	data_validade DATE NOT NULL,
    princ_ativo VARCHAR(100) NOT NULL,
    preco DECIMAL NOT NULL,
	fabricante VARCHAR(100)
);

INSERT INTO Clientes (data_nascimento, nome, cpf, email, telefone) VALUES
('1987-05-12', 'GREGOR', '151251253-1', 'gregorinseto@lcb.com', '(6)52365-4234'),
('1792-10-23', 'SANCHO', '164789995-6', 'secondkindred@lamanchaland.com', '(66)66666-6666'),
('2003-07-05', 'SINCLAIR', '637735656-7', 'clanker.family@lcb.com', '(67)26643-2562'),
('1998-02-11', 'HEATHCLIFF', '124562136-6', 'heartbroken@lcb.com', '(12)12552-3623');

INSERT INTO Medicamento (data_validade, nome, princ_ativo, preco, fabricante) VALUES
('2020-01-01', 'TETANOGAMMA', 'IMUNOGLOBINA ANTITETÂNICA HUMANA', 91.41, 'CSL BEHRING'),
('2010-01-01', 'ALBENDAZOL', 'ALBENDAZOL', 8.98, 'CIMED'),
('2015-01-01', 'DIPIRONA', 'DIPIRONA MONOIDRATADA', 11.42, 'NEO QUIMICA');