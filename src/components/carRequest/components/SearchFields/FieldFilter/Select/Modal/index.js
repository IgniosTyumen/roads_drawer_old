import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import styles from './Modal.css';

class Modal extends Component {

  handleClickOutside = () => {
    this.props.toggleModal();
  }

  render () {
    const {
      list,
      handleElementClick
    } = this.props;
    return (
      <ul className={styles.container}>
        {
          list.map(({name, label}) => <li className={styles.element} onClick={handleElementClick(name)}>{label}</li>)
        }
      </ul>
    )
  }
}

export default onClickOutside(Modal);
