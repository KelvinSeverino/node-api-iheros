import IncorrectRequest from "./IncorrectRequest.js";

class UniqueConstraintError extends IncorrectRequest {
    constructor(error){
        if (error.errors && Array.isArray(error.errors)) {
            const errorsMessage = error.errors
                .filter(err => err.type === 'unique violation')  // Filtra erros de violação de unicidade
                .map(err => err.message)  // Extrai a mensagem de cada erro
                .join("; ");  // Junta todas as mensagens com um delimitador

            super(`Os seguintes erros de unicidade foram encontrados: ${errorsMessage}`);
        } else {
            super("Erro de restrição de unicidade desconhecido.");
        }
    }
}

export default UniqueConstraintError;