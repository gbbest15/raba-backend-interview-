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
exports.GetProductComparison = void 0;
const either_1 = require("../../../shared/either");
class GetProductComparison {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productRepository.findAll(filters);
                if (products.isLeft()) {
                    return (0, either_1.left)(new Error(`Failed to retrieve products: ${products.value.message}`));
                }
                const groupedProducts = products.value.reduce((acc, product) => {
                    if (!acc[product.name]) {
                        acc[product.name] = [];
                    }
                    acc[product.name].push(product);
                    return acc;
                }, {});
                // Find lowest price for each product group
                const comparisonResults = Object.entries(groupedProducts).map(([name, products]) => {
                    const lowestPrice = Math.min(...products.map(p => p.price));
                    return {
                        name,
                        products: products.map(p => (Object.assign(Object.assign({}, p), { isLowestPrice: p.price === lowestPrice })))
                    };
                });
                return (0, either_1.right)(comparisonResults);
                ;
            }
            catch (error) {
                throw new Error(`Error comparing products: ${error.message}`);
            }
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productResult = yield this.productRepository.create(product);
                if (productResult.isLeft()) {
                    return (0, either_1.left)(new Error(`Failed to create product: ${productResult.value.message}`));
                }
                return (0, either_1.right)(productResult.value);
            }
            catch (error) {
                throw new Error(`Error creating product: ${error.message}`);
            }
        });
    }
}
exports.GetProductComparison = GetProductComparison;
//# sourceMappingURL=getProductComparison.js.map