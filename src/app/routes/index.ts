import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import orderRouter from '../modules/Order/order.route';
import cartRouter from '../modules/Cart/cart.route';
import { QuoteRoutes } from '../modules/Quote/quote.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: orderRouter,
  },
  {
    path: '/cart',
    route: cartRouter,
  },
  {
    path: '/quotes',
    route: QuoteRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
