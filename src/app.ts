import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/database';
import { productRouter } from './presentation/routes/product.routes';
import { supplierRouter } from './presentation/routes/supplier.route';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()



const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());



app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});
const port = 3000;

app.use('/api/products', productRouter);
 app.use('/api/suppliers', supplierRouter);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();