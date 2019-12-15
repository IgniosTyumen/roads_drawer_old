import React, {Component} from 'react';
import classNames from 'classnames';
import styles from './Modal.css';

class Modal extends Component {
  render() {
    const { children, isOpen } = this.props;

    const classes = classNames(
      styles.wrapper,
      isOpen ? styles.open : styles.close,
    );

    return (
      <div className={classes}>
        <div className={styles.subWrapper}>
          <div className={styles.modal}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
