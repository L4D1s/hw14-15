import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import styles from './Cart.module.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      dispatch(removeFromCart(productId));
    } else {
      const product = products.find(p => p.id === productId);
      if (product && quantity <= product.stock) {
        dispatch(updateQuantity({ id: productId, quantity }));
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <h2>Корзина</h2>
        <p>Корзина пуста</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      <div className={styles.cartItems}>
        {cartItems.map(item => {
          const product = products.find(p => p.id === item.id);
          const maxQuantity = product ? product.stock : 0;

          return (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p className={styles.price}>
                  {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity} = 
                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                </p>
                <p className={styles.stock}>Остаток на складе: {maxQuantity} шт.</p>
              </div>
              <div className={styles.quantityControls}>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= maxQuantity}
                  className={styles.quantityButton}
                >
                  +
                </button>
                <button 
                  onClick={() => handleRemoveFromCart(item.id)}
                  className={styles.removeButton}
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.total}>
        <h3>Итого: {totalPrice.toLocaleString('ru-RU')} ₽</h3>
      </div>
    </div>
  );
};

export default Cart; 