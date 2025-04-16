import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from './Cart';
import cartReducer from '../store/cartSlice';
import productsReducer from '../store/productsSlice';

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer
    },
    preloadedState: {
      cart: initialState.cart || { items: [], totalPrice: 0 },
      products: initialState.products || { products: [] }
    }
  });
};

describe('Cart Component', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', price: 100, stock: 5 },
    { id: 2, name: 'Product 2', price: 200, stock: 3 }
  ];

  const mockItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    { id: 2, name: 'Product 2', price: 200, quantity: 1 }
  ];

  it('renders empty cart message when cart is empty', () => {
    const store = createTestStore({
      cart: { items: [], totalPrice: 0 },
      products: { products: mockProducts }
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText(/корзина пуста/i)).toBeInTheDocument();
  });

  it('renders cart items when cart is not empty', () => {
    const store = createTestStore({
      cart: { items: mockItems, totalPrice: 400 },
      products: { products: mockProducts }
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('calculates total price correctly', () => {
    const store = createTestStore({
      cart: { items: mockItems, totalPrice: 400 },
      products: { products: mockProducts }
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText(/400 ₽/i)).toBeInTheDocument();
  });
}); 