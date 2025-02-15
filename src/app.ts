import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app = express();

// Middleware setup
app.use(express.json());
// Enable CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://your-deployed-frontend.com'], // Allow frontend URLs
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }),
);

app.use(bodyParser.json());

// Route handlers
app.use('/api', router);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to BookShop backend server!');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
