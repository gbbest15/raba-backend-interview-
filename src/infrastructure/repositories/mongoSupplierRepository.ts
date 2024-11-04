import { ISupplierRepository } from "../../domain/repositories/iSupplierRepository";
import { Supplier } from "../../domain/entities/supplier";
import { SupplierModel } from "../database/models/supplierModel";
import { RepositoryError } from "../../shared/errors/repository.error";
import { Either, left, right } from "../../shared/either";

export class MongoSupplierRepository implements ISupplierRepository {
    async findAll(): Promise<Either<RepositoryError, Supplier[]>> {
        try {
            const suppliers = await SupplierModel.find();
            return right(suppliers);
        } catch (error) {
            return left(new RepositoryError('Error finding suppliers', error));
        }
    }
    async findById(id: string): Promise<Supplier | null> {
        const supplier = await SupplierModel.findById(id);
        return supplier;
    }
    async create(supplier: Omit<Supplier, 'id'>): Promise<Either<RepositoryError, Supplier>> {
        try {
            const newSupplier = new SupplierModel(supplier);
            await newSupplier.save();
            return right(newSupplier)   ;
            
        } catch (error) {
            return left(new RepositoryError('Error creating supplier', error));
        }
       
    }
    async update(id: string, supplier: Partial<Supplier>): Promise<Supplier | null> {
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, supplier, { new: true });
        return updatedSupplier;
    }
    async delete(id: string): Promise<boolean> {
        const result = await SupplierModel.findByIdAndDelete(id);
        return result ? true : false;
    }

}