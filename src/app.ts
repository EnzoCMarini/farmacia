import { server } from "./server.js"; 
import { DatabaseModel } from "./model/DatabaseModel.js";

const port: number = 3334; 
new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        })
    } else {
        console.log('Não foi possível conectar ao banco de dados');
    }
})
 
server.listen(port, () => {
    console.log(`Servidor executando no endereço: http://local:${port}`);
})