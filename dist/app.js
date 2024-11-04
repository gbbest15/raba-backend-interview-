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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = require("./config/database");
const product_routes_1 = require("./presentation/routes/product.routes");
const supplier_route_1 = require("./presentation/routes/supplier.route");
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});
const port = 3000;
app.use('/api/products', product_routes_1.productRouter);
app.use('/api/suppliers', supplier_route_1.supplierRouter);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDB)();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
startServer();
//# sourceMappingURL=app.js.map