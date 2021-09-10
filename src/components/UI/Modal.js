import styles from './Modal.module.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
const Backdrop = props => {
    return <div onClick = {props.onClose} className={styles.backdrop}></div>
}

const ModalOverlay = props => {
    return (
    <div className={styles.modal}>
          <div className={styles.content}>{props.children}</div>
    </div>
    )
}

const Modal = props => {
    return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById('overlay'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlay'))}
    </Fragment>
    )
}



export default Modal;