"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
const either_1 = require("../../shared/either");
const domain_error_1 = require("../../shared/errors/domain.error");
class Price {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (value < 0) {
            return (0, either_1.left)(new domain_error_1.DomainError('Price cannot be negative'));
        }
        return (0, either_1.right)(new Price(value));
    }
    getValue() {
        return this.value;
    }
}
exports.Price = Price;
//# sourceMappingURL=price.js.map