/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { RepositoryError } from '../../shared/errors/repository.error';
import { Product } from '../../domain/entities/product';
import { IProductRepository, ProductFilters } from '../../domain/repositories/iProductRepository';
import { Either, right, left } from '../../shared/either';
import { ProductModel } from '../database/models/productModel';

export class MongoProductRepository implements IProductRepository {
  async findSupplierOtherProducts(supplierId: string): Promise<Either<RepositoryError, Product[]>> {
    try {
      const products = await ProductModel.find({ supplierId: supplierId }).lean();
      return right(products as unknown as Product[]);
    } catch (error) {
      return left(new RepositoryError('Error finding supplier other products', error));
    }
  }
  async findAll(filters?: ProductFilters): Promise<Either<RepositoryError, Product[]>> {
    try {
      const query: any = {};
      
      if (filters?.name) {
        query.name = { $regex: filters.name, $options: 'i' };
      }
      if (filters?.supplier) {
        query.supplierId = filters.supplier;
      }
      if (filters?.availability !== undefined) {
        query.availability = filters.availability;
      }
      if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
        query.price = {};
        if (filters.minPrice !== undefined) {
          query.price.$gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
          query.price.$lte = filters.maxPrice;
        }
      }
      if (filters?.category) {
        query.category = filters.category;
      }

      const products = await ProductModel.find(query)
        .populate('supplierId')
        .sort({ createdAt: -1 })
        .lean();

      return right(products as unknown as Product[]);
    } catch (error) {
      return left(new RepositoryError('Error finding products', error));
    }
  }

  async findById(id: string): Promise<Either<RepositoryError, Product | null>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return left(new RepositoryError('Invalid product ID format'));
      }

      const product = await ProductModel.findById(id)
        .populate('supplierId')
        .lean();

      return right(product as unknown as Product | null);
    } catch (error) {
      return left(new RepositoryError('Error finding product by ID', error));
    }
  }

  async create(productData: Omit<Product, 'id'>): Promise<Either<RepositoryError, Product>> {
    try {
      if (!productData.supplierId || !Types.ObjectId.isValid(productData.supplierId)) {
        return left(new RepositoryError('Invalid supplier ID'));
      }

      const product = new ProductModel(productData);
      const savedProduct = await product.save();
      await savedProduct.populate('supplierId');

      return right(savedProduct.toObject() as unknown as Product);
    } catch (error) {
      return left(new RepositoryError('Error creating product', error));
    }
  }

  async update(id: string, productData: Partial<Product>): Promise<Either<RepositoryError, Product | null>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return left(new RepositoryError('Invalid product ID format'));
      }

      if (productData.supplierId && !Types.ObjectId.isValid(productData.supplierId)) {
        return left(new RepositoryError('Invalid supplier ID format'));
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { $set: productData },
        { new: true, runValidators: true }
      )
        .populate('supplierId')
        .lean();

      return right(updatedProduct as unknown as Product | null);
    } catch (error) {
      return left(new RepositoryError('Error updating product', error));
    }
  }

  async delete(id: string): Promise<Either<RepositoryError, boolean>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return left(new RepositoryError('Invalid product ID format'));
      }

      const result = await ProductModel.findByIdAndDelete(id);
      
      if (!result) {
        return right(false);
      }

      return right(true);
    } catch (error) {
      return left(new RepositoryError('Error deleting product', error));
    }
  }
}