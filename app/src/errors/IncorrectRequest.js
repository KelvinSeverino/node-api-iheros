import BaseError from "./BaseError.js";

class IncorrectRequest extends BaseError {
    constructor(message = "Requisição inválida"){
        super(message, 400);
    }
}

export default IncorrectRequest;