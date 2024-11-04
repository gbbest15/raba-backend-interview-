"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryError = void 0;
const error_1 = require("./error");
class RepositoryError extends error_1.BaseError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message, originalError) {
        super(message);
        this.originalError = originalError;
    }
}
exports.RepositoryError = RepositoryError;
//# sourceMappingURL=repository.error.js.map