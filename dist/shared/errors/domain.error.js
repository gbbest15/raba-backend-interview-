"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
const error_1 = require("./error");
class DomainError extends error_1.BaseError {
    constructor(message) {
        super(message);
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=domain.error.js.map