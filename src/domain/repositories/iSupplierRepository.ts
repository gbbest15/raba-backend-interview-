import { Either } from "../../shared/either";
import { RepositoryError } from "../../shared/errors/repository.error";
import { Supplier } from "../entities/supplier";

export interface ISupplierRepository {
    findAll(): Promise<Either<RepositoryError, Supplier[]>>;
    
  
    findById(id: string): Promise<Supplier | null>;
    create(product: Omit<Supplier, 'id'>): Promise<Either<RepositoryError, Supplier>>
  
    update(id: string, supplier: Partial<Supplier>): Promise<Supplier | null>;
    delete(id: string): Promise<boolean>;
  }