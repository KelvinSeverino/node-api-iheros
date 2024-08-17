import BaseError from "./BaseError.js";

class Unauthorized extends BaseError {
    constructor(message = "Acesso não autorizado") {
        super(message, 401);
    }
}

export default Unauthorized;