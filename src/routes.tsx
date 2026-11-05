import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Account from './pages/Account';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetail from './pages/ProductDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'orders',
        element: <OrderHistory />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'order-confirmation',
        element: <OrderConfirmation />,
      },
    ],
  },
]);
