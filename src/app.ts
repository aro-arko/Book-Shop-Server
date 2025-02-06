import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Route handlers
app.use('/api', router);
// app.use('/api/products', ProductRouters);
// app.use('/api/orders', OrderRouters);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to BookShop backend server!');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
