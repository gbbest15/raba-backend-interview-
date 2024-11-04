"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductFilters = void 0;
const zod_1 = require("zod");
const productFiltersSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    supplier: zod_1.z.string().optional(),
    minPrice: zod_1.z.number().positive().optional(),
    maxPrice: zod_1.z.number().positive().optional(),
    availability: zod_1.z.boolean().optional(),
    category: zod_1.z.string().optional()
});
const validateProductFilters = (req, res, next) => {
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
    }
    catch (error) {
        res.status(400).json({
            error: 'Validation Error',
            message: error.errors
        });
    }
};
exports.validateProductFilters = validateProductFilters;
//# sourceMappingURL=validation.js.map