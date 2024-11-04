import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const productFiltersSchema = z.object({
  name: z.string().optional(),
  supplier: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  availability: z.boolean().optional(),
  category: z.string().optional()
});

export const validateProductFilters = (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = {
      name: req.query.name,
      supplier: req.query.supplier,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      availability: req.query.availability ? req.query.availability === 'true' : undefined,
      category: req.query.category
    };

    productFiltersSchema.parse(filters);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.errors
    });
  }
}