import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { Fragment, useContext,useState } from 'react';

const Cart = props => {
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
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

    const submitOrderHandler = async(userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://reactfoodapp-1e874-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({user:userData, orderedItems:cartCtx.items})
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
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

    const cartModalContent = <Fragment>
    {cartItems}
            <div className = {styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isCheckout && modalActions }
           
    </Fragment>
    const isSubmittingModalContent = <p>Sending Order Data...</p>
    const didSubmitModalContent = <Fragment>
        <p>Successfully submitted order!</p>
        <div className = {styles.actions}>
        <button onClick={props.onHideCart} className={styles['button']}>Close</button>
        </div>

        </Fragment>
    return (
        <Modal onClose={props.onHideCart} >
        {!isSubmitting && !didSubmit && cartModalContent}
          {isSubmitting && isSubmittingModalContent}
          {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;