import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<ProductList />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);
