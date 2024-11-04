import { Request, Response } from 'express';
import { GetProductComparison } from '../../application/use-cases/product/getProductComparison';


export class ProductController {
  constructor(private getProductComparison: GetProductComparison) {}

  async compareProducts(req: Request, res: Response) {
    try {
      const filters = {
        name: req.query.name as string,
        supplier: req.query.supplier as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        availability: req.query.availability ? req.query.availability === 'true' : undefined,
        category: req.query.category as string
      };

      const comparisonResults = await this.getProductComparison.execute(filters);
      if (comparisonResults.isLeft()) {
        return res.status(400).json({
          error: 'Bad Request',
          message: comparisonResults.value.message
        });
      }
      res.json(comparisonResults.value);
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  async getSupplierOtherProducts(req: Request, res: Response) {
    try {
      const { supplierId } = req.params;
      const products = await this.getProductComparison.getSupplierOtherProducts(supplierId);
      if (products.isLeft()) {
      return res.status(400).json({
        error: 'Bad Request',
        message: products.value.message
      });
    }
    res.json(products.value);
  } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
  }
}
}
