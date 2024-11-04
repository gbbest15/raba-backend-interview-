import { Either } from '../../shared/either';
import { RepositoryError } from '../../shared/errors/repository.error';
import { Product } from '../entities/product';

export interface ProductFilters {
  name?: string;
  supplier?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  category?: string;
}

export interface IProductRepository {
  findAll(filters?: ProductFilters): Promise<Either<RepositoryError, Product[]>>;
  findById(id: string): Promise<Either<RepositoryError, Product | null>>;
  create(product: Omit<Product, 'id'>): Promise<Either<RepositoryError, Product>>;
  update(id: string, product: Partial<Product>): Promise<Either<RepositoryError, Product | null>>;
  delete(id: string): Promise<Either<RepositoryError, boolean>>;
  findSupplierOtherProducts(supplierId: string): Promise<Either<RepositoryError, Product[]>>;
}