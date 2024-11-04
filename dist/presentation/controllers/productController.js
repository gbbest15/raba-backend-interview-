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
exports.ProductController = void 0;
class ProductController {
    constructor(getProductComparison) {
        this.getProductComparison = getProductComparison;
    }
    compareProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = {
                    name: req.query.name,
                    supplier: req.query.supplier,
                    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
                    availability: req.query.availability ? req.query.availability === 'true' : undefined,
                    category: req.query.category
                };
                const comparisonResults = yield this.getProductComparison.execute(filters);
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
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map