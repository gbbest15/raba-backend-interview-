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
exports.MongoSupplierRepository = void 0;
const supplierModel_1 = require("../database/models/supplierModel");
const repository_error_1 = require("../../shared/errors/repository.error");
const either_1 = require("../../shared/either");
class MongoSupplierRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suppliers = yield supplierModel_1.SupplierModel.find();
                return (0, either_1.right)(suppliers);
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error finding suppliers', error));
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplierModel_1.SupplierModel.findById(id);
            return supplier;
        });
    }
    create(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSupplier = new supplierModel_1.SupplierModel(supplier);
                yield newSupplier.save();
                return (0, either_1.right)(newSupplier);
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error creating supplier', error));
            }
        });
    }
    update(id, supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSupplier = yield supplierModel_1.SupplierModel.findByIdAndUpdate(id, supplier, { new: true });
            return updatedSupplier;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield supplierModel_1.SupplierModel.findByIdAndDelete(id);
            return result ? true : false;
        });
    }
}
exports.MongoSupplierRepository = MongoSupplierRepository;
//# sourceMappingURL=mongoSupplierRepository.js.map