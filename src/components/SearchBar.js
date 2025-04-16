import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/productsSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск товаров..."
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar; 