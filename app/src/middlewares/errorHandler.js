import BaseError from "../errors/BaseError.js";
import Unauthorized from "../errors/Unauthorized.js";
import Forbidden from "../errors/Forbidden.js";
import NotFound from "../errors/NotFound.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";
import UniqueConstraintError from "../errors/UniqueConstraintError.js";
import { UniqueConstraintError as SequelizeUniqueConstraintError, ValidationError as SequelizeValidationError } from 'sequelize';

function errorHandler (error, req, res, next) { 
    //console.log("Erro recebido:", error);
    //console.log("Nome da classe do erro:", error.constructor.name);  
    
    if(error instanceof Unauthorized) {
        error.sendResponse(res);
    } else if(error instanceof Forbidden) {
        error.sendResponse(res);
    } else if(error instanceof NotFound) {
        error.sendResponse(res);

    } else if(error instanceof IncorrectRequest) {
        new IncorrectRequest().sendResponse(res);
    
    // Erros do Sequelize
    } else if (error instanceof SequelizeUniqueConstraintError) {
        new UniqueConstraintError(error).sendResponse(res);
    } else if (error instanceof SequelizeValidationError) {
        new ValidationError(error).sendResponse(res);

    } else if (error instanceof BaseError) {
        error.sendResponse(res);

    } else {
        new BaseError().sendResponse(res);
    };
}

export default errorHandler;