import { Request, Response } from 'express';
import { SupplierUseCase } from '../../application/use-cases/supplier/supplier_usescase';


export class SupplierController {
  constructor(private getProductComparison: SupplierUseCase) {}

  async getSuppliers(req: Request, res: Response) {
    try {
     

      const comparisonResults = await this.getProductComparison.execute();
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

  async createSupplier(req: Request, res: Response) {
    try {
      const supplier = req.body;
      const result = await this.getProductComparison.createSupplier(supplier);
      if (result.isLeft()) {
        return res.status(400).json({
          error: 'Bad Request',
          message: result.value.message
        });
      }
      res.json(result.value);
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }

  
}
