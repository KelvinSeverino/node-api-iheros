import BaseError from "./BaseError.js";

class Forbidden extends BaseError {
    constructor(message = "Você não possui permissão para acessar") {
        super(message, 403);
    }
}

export default Forbidden;