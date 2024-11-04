import { Product } from "../../../domain/entities/product";
import { IProductRepository, ProductFilters } from "../../../domain/repositories/iProductRepository";
import { Either, left, right } from "../../../shared/either";

export class GetProductComparison {
    constructor(
      private productRepository: IProductRepository,
    ) {}
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async execute(filters: ProductFilters): Promise<Either<Error, any>>  {
      try {
        const products = await this.productRepository.findAll(filters);

        if (products.isLeft()) {
          return left(new Error(`Failed to retrieve products: ${products.value.message}`));
        }

        
        const groupedProducts = products.value.reduce((acc, product) => {
          if (!acc[product.name]) {
            acc[product.name] = [];
          }
          acc[product.name].push(product);
          return acc;
        }, {} as Record<string, Product[]>);
  
        // Find lowest price for each product group
        const comparisonResults = Object.entries(groupedProducts).map(([name, products]) => {
          const lowestPrice = Math.min(...products.map(p => p.price));
          return {
            name,
            products: products.map(p => ({
              ...p,
              isLowestPrice: p.price === lowestPrice
            }))
          };
        });
  
        return right(comparisonResults);;
      } catch (error) {
        throw new Error(`Error comparing products: ${error.message}`);
      }
    }

    async createProduct(product: Product): Promise<Either<Error, Product>> {
      try {
        const productResult = await this.productRepository.create(product);

        if (productResult.isLeft()) {
          return left(new Error(`Failed to create product: ${productResult.value.message}`));
        }
        return right(productResult.value);
      } catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
      }
      
    }

    async getSupplierOtherProducts(supplierId: string): Promise<Either<Error, Product[]>> {
      try {
        const products = await this.productRepository.findSupplierOtherProducts(supplierId);

        if (products.isLeft()) {
          return left(new Error(`Failed to retrieve supplier other products: ${products.value.message}`));
        }
        return right(products.value);
      } catch (error) {
        throw new Error(`Error getting supplier other products: ${error.message}`);
      }
    }
  }
