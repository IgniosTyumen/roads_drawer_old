import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import styles from './Dropdown.css';
import {openModal} from '~/components/carRequest/actions/NotifyActions';
import {getCarRequestStatusName} from '~/components/carRequest/utils/common';

let DropdownListItem = ({ listItem, openModal, handleToggleDropdown }) => {
  const handleClick = () => {
    openModal(listItem);
    handleToggleDropdown();
  };

  const classes = classNames(
    styles.dropdown_item,
  );
  const underlineClasses = classNames(
    styles.underline,
  );
  return (
      <span className={classes} onClick={handleClick}>
        {`Заявка №: ${listItem}`}
      </span>
  );
};

const mapDispatchToProps = {
  openModal,
};

DropdownListItem = connect(null, mapDispatchToProps)(DropdownListItem);

const DropdownCategoryWrapper = ({ list, category, handleToggleDropdown }) => {
  const classes = classNames(
    styles.dropdownCategory,
  );

  return (
    <div className={classes}>
      <span className={styles.categoryTitle}>{getCarRequestStatusName(category)}</span>
      {
        list.map(item => (
            <DropdownListItem
              listItem={item.id}
              key={item.id}
              handleToggleDropdown={handleToggleDropdown}
            />
        ))
      }
    </div>
  );
};

const Dropdown = ({ list, isOpenDropdown, handleToggleDropdown }) => {
  let classes = classNames(
    styles.dropdown_block,
  );

  if (isOpenDropdown) {
    classes = classNames(
      styles.dropdown_block,
      styles.dropdown_block__show,
    );
  }

  const listByStatuses = {};

  list.forEach((item) => {
    if (!listByStatuses[item.status]) {
      listByStatuses[item.status] = [item];
    } else {
      listByStatuses[item.status].push(item);
    }
  });

  const listByStatusesKeys = Object.keys(listByStatuses);

  return (
    <div className={classes}>
      <div className={styles.inner}>
        {
          listByStatusesKeys.map(((category, i) => (
              <DropdownCategoryWrapper
                category={category}
                list={listByStatuses[category]}
                handleToggleDropdown={handleToggleDropdown}
                key={i}
              />
          )))
        }
      </div>
    </div>
  );
};

export default (Dropdown);
