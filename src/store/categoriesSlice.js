import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';

const initialState = {
  categories: categories,
  currentCategory: null,
  loading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setCategories, setCurrentCategory, setLoading, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer; 