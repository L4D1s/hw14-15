import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductList from './ProductList';
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
      products: initialState.products || { products: [], searchQuery: '' }
    }
  });
};

describe('ProductList Component', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1', stock: 5 },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2', stock: 3 }
  ];

  it('renders all products', () => {
    const store = createTestStore({
      cart: { items: [], totalPrice: 0 },
      products: { products: mockProducts, searchQuery: '' }
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('displays product prices correctly', () => {
    const store = createTestStore({
      cart: { items: [], totalPrice: 0 },
      products: { products: mockProducts, searchQuery: '' }
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(screen.getByText(/100 ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/200 ₽/i)).toBeInTheDocument();
  });

  it('filters products based on search input', () => {
    const store = createTestStore({
      cart: { items: [], totalPrice: 0 },
      products: { products: mockProducts, searchQuery: 'Product 1' }
    });
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });
}); 