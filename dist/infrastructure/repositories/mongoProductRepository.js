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
exports.MongoProductRepository = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const repository_error_1 = require("../../shared/errors/repository.error");
const either_1 = require("../../shared/either");
const productModel_1 = require("../database/models/productModel");
class MongoProductRepository {
    findAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {};
                if (filters === null || filters === void 0 ? void 0 : filters.name) {
                    query.name = { $regex: filters.name, $options: 'i' };
                }
                if (filters === null || filters === void 0 ? void 0 : filters.supplier) {
                    query.supplierId = filters.supplier;
                }
                if ((filters === null || filters === void 0 ? void 0 : filters.availability) !== undefined) {
                    query.availability = filters.availability;
                }
                if ((filters === null || filters === void 0 ? void 0 : filters.minPrice) !== undefined || (filters === null || filters === void 0 ? void 0 : filters.maxPrice) !== undefined) {
                    query.price = {};
                    if (filters.minPrice !== undefined) {
                        query.price.$gte = filters.minPrice;
                    }
                    if (filters.maxPrice !== undefined) {
                        query.price.$lte = filters.maxPrice;
                    }
                }
                if (filters === null || filters === void 0 ? void 0 : filters.category) {
                    query.category = filters.category;
                }
                const products = yield productModel_1.ProductModel.find(query)
                    .populate('supplierId')
                    .sort({ createdAt: -1 })
                    .lean();
                return (0, either_1.right)(products);
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error finding products', error));
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    return (0, either_1.left)(new repository_error_1.RepositoryError('Invalid product ID format'));
                }
                const product = yield productModel_1.ProductModel.findById(id)
                    .populate('supplierId')
                    .lean();
                return (0, either_1.right)(product);
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error finding product by ID', error));
            }
        });
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!productData.supplierId || !mongoose_1.Types.ObjectId.isValid(productData.supplierId)) {
                    return (0, either_1.left)(new repository_error_1.RepositoryError('Invalid supplier ID'));
                }
                const product = new productModel_1.ProductModel(productData);
                const savedProduct = yield product.save();
                yield savedProduct.populate('supplierId');
                return (0, either_1.right)(savedProduct.toObject());
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error creating product', error));
            }
        });
    }
    update(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    return (0, either_1.left)(new repository_error_1.RepositoryError('Invalid product ID format'));
                }
                if (productData.supplierId && !mongoose_1.Types.ObjectId.isValid(productData.supplierId)) {
                    return (0, either_1.left)(new repository_error_1.RepositoryError('Invalid supplier ID format'));
                }
                const updatedProduct = yield productModel_1.ProductModel.findByIdAndUpdate(id, { $set: productData }, { new: true, runValidators: true })
                    .populate('supplierId')
                    .lean();
                return (0, either_1.right)(updatedProduct);
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error updating product', error));
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    return (0, either_1.left)(new repository_error_1.RepositoryError('Invalid product ID format'));
                }
                const result = yield productModel_1.ProductModel.findByIdAndDelete(id);
                if (!result) {
                    return (0, either_1.right)(false);
                }
                return (0, either_1.right)(true);
            }
            catch (error) {
                return (0, either_1.left)(new repository_error_1.RepositoryError('Error deleting product', error));
            }
        });
    }
}
exports.MongoProductRepository = MongoProductRepository;
//# sourceMappingURL=mongoProductRepository.js.map