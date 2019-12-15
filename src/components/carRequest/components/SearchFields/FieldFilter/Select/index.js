import React, {Component} from 'react';

import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import Modal from './Modal';

import styles from './Select.css';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      outsideClickIgnoreClass: `ignore-react-onclickoutside-${Math.random()}`
    };
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    })
  }

  handleButtonClick = () => {
    const { toggleModal } = this;
    toggleModal();
  }

  handleElementClick = (newFieldName) => () => {
    const { toggleModal } = this;
    const { replaceFilterField, fieldName } = this.props;
    replaceFilterField(fieldName, newFieldName);
    toggleModal();
  }

  render() {
    const { handleButtonClick, handleElementClick, toggleModal } = this;
    const { isOpen, outsideClickIgnoreClass } = this.state;
    const { list } = this.props;

    return (
      <div className={styles.container}>
        <Button
          type='button'
          onClick={handleButtonClick}
          variant='leftSquare'
          className={outsideClickIgnoreClass}
          disabled={list.length === 0}
        >
          <FAIcon name='fas fa-chevron-down' />
        </Button>
        {
          isOpen &&
          <Modal
            list={list}
            handleElementClick={handleElementClick}
            toggleModal={toggleModal}
            outsideClickIgnoreClass={outsideClickIgnoreClass}
          />
        }
      </div>
    )
  }
}

export default Select;
