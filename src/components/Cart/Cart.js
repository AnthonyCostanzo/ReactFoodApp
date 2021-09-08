import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import { useContext } from 'react';
const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount =  `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1})
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map(item=>(
        <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onAdd={cartItemAddHandler.bind(null,item)} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)}>{item.name}</CartItem>)
        )}
        </ul>
    return (
        <Modal>
            {cartItems}
            <div className = {styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className = {styles.actions}>
                <button onClick={props.onHideCart} className={styles['button--alt']}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;