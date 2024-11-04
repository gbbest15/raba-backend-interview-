"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRouter = void 0;
const express_1 = require("express");
exports.supplierRouter = (0, express_1.Router)();
exports.default = (supplierController) => {
    exports.supplierRouter.get('/suppliers', supplierController.getSuppliers.bind(supplierController));
    exports.supplierRouter.post('/suppliers', supplierController.createSupplier.bind(supplierController));
    return exports.supplierRouter;
};
//# sourceMappingURL=supplier.route.js.map