import React from 'react';
import styles from './Pagination.css';
import Button from '~/components/carRequest/components/ui/Button';
import FAIcon from '~/components/carRequest/components/ui/FAIcon';

class Pagination extends React.Component {
  handleClick = page => () => {
    const { changeTablePage, totalPages, currentPage } = this.props;
    if (page < 1 || page > totalPages || page === currentPage) return;
    changeTablePage(page);
  }

  render() {
    const { totalPages, currentPage } = this.props;
    const { handleClick } = this;

    const renderButtons = () => {
      let buttons = [];
      // if (totalPages < 6) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <Button variant={i === currentPage ? 'primary' : 'default'}
              className={i === currentPage ? styles.active : null}
              onClick={handleClick(i)}
              key={i}
            >
              {i}
            </Button>,
        );
      }
      // }
      buttons = [
        <Button key={-2} onClick={handleClick(1)} disabled={currentPage == 1}>
          <FAIcon name='fas fa-angle-double-left' />
        </Button>,
        <Button key={-1} onClick={handleClick(currentPage - 1)} disabled={currentPage == 1}>
          <FAIcon name='fas fa-angle-left' />
        </Button>,
        ...buttons,
        <Button key={1001} onClick={handleClick(currentPage + 1)} disabled={currentPage == totalPages}>
          <FAIcon name='fas fa-angle-right' />
        </Button>,
        <Button key={1002} onClick={handleClick(totalPages)} disabled={currentPage == totalPages}>
          <FAIcon name='fas fa-angle-double-right' />
        </Button>,
      ];
      return buttons;
    };

    return (
      <div className={styles.container}>
        {renderButtons()}
        {/* <Button className={styles.toggle}>^</Button> */}
      </div>
    );
  }
}

export default Pagination;
