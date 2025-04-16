import { createSlice } from '@reduxjs/toolkit';
import { products } from '../data/products';

const initialState = {
  products: products,
  loading: false,
  error: null,
  currentProduct: null,
  searchQuery: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

// Селектор для фильтрации товаров по поисковому запросу
export const selectFilteredProducts = (state) => {
  const { products, searchQuery } = state.products;
  if (!searchQuery) return products;
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const { setProducts, setCurrentProduct, setLoading, setError, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer; 