class ReqFieldException extends Error {
    constructor(field) {
        super(field + ' es requerido');
        this.status = 400;
    }
}

module.exports = ReqFieldException;
