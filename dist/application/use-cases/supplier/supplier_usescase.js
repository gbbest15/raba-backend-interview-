"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierUseCase = void 0;
const either_1 = require("../../../shared/either");
class SupplierUseCase {
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suppliers = yield this.supplierRepository.findAll();
                if (suppliers.isLeft()) {
                    return (0, either_1.left)(new Error(`Failed to retrieve products: ${suppliers.value.message}`));
                }
                return (0, either_1.right)(suppliers.value);
                ;
            }
            catch (error) {
                throw new Error(`Error comparing products: ${error.message}`);
            }
        });
    }
    createSupplier(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierResult = yield this.supplierRepository.create(supplier);
                if (supplierResult.isLeft()) {
                    return (0, either_1.left)(new Error(`Failed to create supplier: ${supplierResult.value.message}`));
                }
                return (0, either_1.right)(supplierResult.value);
            }
            catch (error) {
                throw new Error(`Error creating supplier: ${error.message}`);
            }
        });
    }
}
exports.SupplierUseCase = SupplierUseCase;
//# sourceMappingURL=supplier_usescase.js.map