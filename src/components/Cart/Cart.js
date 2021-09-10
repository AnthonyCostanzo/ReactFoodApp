import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useContext,useState } from 'react';

const Cart = props => {
    const [isCheckout,setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount =  `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1})
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const orderHandler = (e) => {
        setIsCheckout(true);
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

    const modalActions =  <div className = {styles.actions}>
    <button onClick={props.onHideCart} className={styles['button--alt']}>Close</button>
    {hasItems && <button onClick = {orderHandler} className={styles.button}>Order</button>}
    </div>;

    return (
        <Modal>
            {cartItems}
            <div className = {styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart}/>}
            {!isCheckout && modalActions }
           
        </Modal>
    )
}

export default Cart;