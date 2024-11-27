import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRouters } from './app/modules/Product/product.route';
import { OrderRouters } from './app/modules/Order/order.route';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRouters);
app.use('/api/orders', OrderRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Worldddd!');
});

export default app;
