
import { Supplier } from "../../../domain/entities/supplier";
import { ISupplierRepository } from "../../../domain/repositories/iSupplierRepository";
import { Either, left, right } from "../../../shared/either";

export class SupplierUseCase {
    constructor(
      private supplierRepository: ISupplierRepository,
    ) {}
  
    async execute(): Promise<Either<Error,  Supplier[]>>{
      try {
        const suppliers = await this.supplierRepository.findAll();

        if (suppliers.isLeft()) {
          return left(new Error(`Failed to retrieve products: ${suppliers.value.message}`));
        }  
        return right(suppliers.value);;
      } catch (error) {
        throw new Error(`Error comparing products: ${error.message}`);
      }
    }

    async createSupplier(supplier: Supplier): Promise<Either<Error, Supplier>> {
      try {
        const supplierResult = await this.supplierRepository.create(supplier);

        if (supplierResult.isLeft()) {   
          return left(new Error(`Failed to create supplier: ${supplierResult.value.message}`));
        }
        return right(supplierResult.value);
      } catch (error) {
        throw new Error(`Error creating supplier: ${error.message}`);
      }
      
    }
  }
