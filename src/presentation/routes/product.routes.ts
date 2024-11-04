import { Router } from 'express';

import { validateProductFilters } from '../middlewares/validation';
import { ProductController } from '../controllers/productController';


export const productRouter = Router();

export default (productController: ProductController) => {
  productRouter.get(
    '/compare',
    validateProductFilters,
    productController.compareProducts.bind(productController)
  );
  
  return productRouter;
};