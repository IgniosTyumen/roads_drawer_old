import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import FAIcon from '~/components/carRequest/components/ui/FAIcon';

import styles from './FieldWrapper.css';

export class FieldWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenHelper: false,
    };
  }

  openHelperModal = () => {
    if (!this.state.isOpenHelper) {
      this.setState({ isOpenHelper: true });
    }
  }

  closeHelperModal = () => {
    if (this.state.isOpenHelper) {
      this.setState({ isOpenHelper: false });
    }
  }

  render() {
    const { closeHelperModal, openHelperModal } = this;
    const { isOpenHelper } = this.state;
    const { helperText } = this.props;

    return (
      <div className={styles.wrapper}>
        {this.props.children}
        {helperText && <button
          onClick={openHelperModal}
          type='button'
          className={styles.helperButton}
        >
          <FAIcon name='fas fa-question-circle' />
        </button>}
        {isOpenHelper
        && <Modal
          closeHelperModal={closeHelperModal}
          preventDefault
          helperText={helperText}
        />
        }
      </div>
    );
  }
}

class HelperModal extends Component {
  handleClickOutside = () => {
    this.props.closeHelperModal();
  }

  render() {
    const { helperText } = this.props;
    return (
      <div className={styles.helperModal}>
        {helperText}
      </div>
    );
  }
}

const Modal = onClickOutside(HelperModal);

export default FieldWrapper;
