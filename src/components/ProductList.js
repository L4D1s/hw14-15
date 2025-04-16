import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredProducts } from '../store/productsSlice';
import { addToCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import SearchBar from './SearchBar';
import styles from './ProductList.module.css';

const ProductList = () => {
  const products = useSelector(selectFilteredProducts);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  return (
    <div className={styles.productList}>
      <h2>Список товаров</h2>
      <SearchBar />
      <div className={styles.productsGrid}>
        {products.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div key={product.id} className={styles.productCard}>
              <h3>{product.name}</h3>
              <p className={styles.price}>Цена: {product.price.toLocaleString('ru-RU')} ₽</p>
              <p className={styles.stock}>Остаток: {product.stock} шт.</p>
              
              <div className={styles.cartControls}>
                {quantity > 0 ? (
                  <>
                    <button 
                      onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                    <button 
                      onClick={() => handleRemoveFromCart(product.id)}
                      className={styles.removeButton}
                    >
                      Удалить
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={styles.addButton}
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList; 