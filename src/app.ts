import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRouters } from './app/modules/Product/product.route';
import { OrderRouters } from './app/modules/Order/order.route';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Route handlers
app.use('/api/products', ProductRouters);
app.use('/api/orders', OrderRouters);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to BookShop backend server!');
});

export default app;
