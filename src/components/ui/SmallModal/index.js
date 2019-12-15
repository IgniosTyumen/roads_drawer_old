import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';

import styles from './SmallModal.css';

class SmallModal extends Component {
  handleClickOutside = () => {
    this.props.onClose();
  }

  render () {
    const {
      children,
      className
    } = this.props;
    return (
      <div className={classnames(styles.container, className)}>
        {children}
      </div>
    )
  }
}

export default onClickOutside(SmallModal);
