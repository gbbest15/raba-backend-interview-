"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
const error_1 = require("./error");
class ApplicationError extends error_1.BaseError {
    constructor(message) {
        super(message);
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=application.error.js.map