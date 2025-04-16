import React from 'react';
import { Provider } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { store } from './store';
import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <h1>Интернет-магазин</h1>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Товары</Link>
            <Link to="/cart" className={styles.navLink}>Корзина</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}

export default App;
