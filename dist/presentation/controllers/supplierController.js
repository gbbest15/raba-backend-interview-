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
exports.SupplierController = void 0;
class SupplierController {
    constructor(getProductComparison) {
        this.getProductComparison = getProductComparison;
    }
    getSuppliers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comparisonResults = yield this.getProductComparison.execute();
                if (comparisonResults.isLeft()) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: comparisonResults.value.message
                    });
                }
                res.json(comparisonResults.value);
            }
            catch (error) {
                res.status(500).json({
                    error: 'Internal Server Error',
                    message: error.message
                });
            }
        });
    }
    createSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplier = req.body;
                const result = yield this.getProductComparison.createSupplier(supplier);
                if (result.isLeft()) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: result.value.message
                    });
                }
                res.json(result.value);
            }
            catch (error) {
                res.status(500).json({
                    error: 'Internal Server Error',
                    message: error.message
                });
            }
        });
    }
}
exports.SupplierController = SupplierController;
//# sourceMappingURL=supplierController.js.map