"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const validation_1 = require("../middlewares/validation");
exports.productRouter = (0, express_1.Router)();
exports.default = (productController) => {
    exports.productRouter.get('/compare', validation_1.validateProductFilters, productController.compareProducts.bind(productController));
    return exports.productRouter;
};
//# sourceMappingURL=product.routes.js.map