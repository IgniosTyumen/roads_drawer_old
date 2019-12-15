import React, {Component} from 'react';

import Checkbox from '~/components/carRequest/components/ui/Checkbox';
import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';
import SmallModal from '~/components/carRequest/components/ui/SmallModal';

import styles from './ControlCell.css';

class ControlCell extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    })
  }

  render () {
    const {
      toggleModal
    } = this;

    const {
      isOpen
    } = this.state;

    const {
      handleClick,
      handleEdit,
      selected,
      data,
      handleDelete,
    } = this.props;

    const openButtonClassName = 'openModalButton-' + Math.random();

    return (
      <td className={styles.controlCell}>
        <Checkbox onChange={handleClick} checked={selected} />
        {
          data && data.number
          && <span className={styles.mobileNumber}># {data.number}</span>
        }
        <div className={styles.optionsWrapper}>
          <Button onClick={toggleModal} className={openButtonClassName}>
            <FAIcon name='fas fa-bars' />
          </Button>
          {isOpen &&
            <SmallModal
              onClose={toggleModal}
              className={styles.modal}
              outsideClickIgnoreClass={openButtonClassName}
            >
              <ul>
                <li onClick={handleEdit}>
                  Отредактировать
                </li>
                <li onClick={handleDelete}>
                  Удалить
                </li>
              </ul>
            </SmallModal>
          }
        </div>
      </td>
    )
  }
}

export default ControlCell;
