import { Router } from 'express';


import { SupplierController } from '../controllers/supplierController';


export const supplierRouter = Router();

export default (supplierController: SupplierController) => {
  supplierRouter.get(
    '/suppliers',
    supplierController.getSuppliers.bind(supplierController)
  );
  supplierRouter.post(
    '/suppliers',
    supplierController.createSupplier.bind(supplierController)
  );
  
  return supplierRouter;
};
