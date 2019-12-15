import React from 'react';
import styles from './Header.css';
// import Icon from 'svg-react-loader?name=Icon!logo.svg';

const Header = props => (
    <header className={styles.header}>
      {/* <Button>
        <FAIcon name='fas fa-long-arrow-alt-left' />
        {' '}На главную
      </Button> */}
      <a href='/' className={styles.logo}>
        {/* <Icon /> */}
        РНИС.ТО
      </a>
      {props.children}
    </header>
);

export default Header;
