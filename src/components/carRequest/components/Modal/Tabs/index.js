import React from 'react';
import styles from './Tabs.css';

const Tabs = ({
  schema,
  handleTabClick,
  activeTab,
}) => {
  const { inlines } = schema.__meta;
  const keys = Object.keys(inlines);

  let tabs = keys.map((key, i) => <div
      onClick={handleTabClick(key)}
      className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
      key={i}
    >{inlines[key].__meta.title}</div>);

  const formTab = <div
      onClick={handleTabClick('form')}
      className={`${styles.tab} ${activeTab === 'form' ? styles.tabActive : ''}`}
      key={-1}
    >Основное</div>;

  const changeLogTab = <div
      onClick={handleTabClick('changeLog')}
      className={`${styles.tab} ${activeTab === 'changeLog' ? styles.tabActive : ''}`}
      key={-3}
    >Последние изменения</div>;

  tabs = [formTab, ...tabs];

  if (schema.__meta.fields.some(field => field === 'geodata')) {
    const geoDataTab = <div
      onClick={handleTabClick('geodata')}
      className={`${styles.tab} ${activeTab === 'geodata' ? styles.tabActive : ''}`}
      key={-2}
    >{schema.geodata.info.verbose_name}</div>;

    tabs.push(geoDataTab);
  }

  if (
    schema.__meta.extra.custom_tabs
    && schema.__meta.extra.custom_tabs.some(tab => tab[0] === 'ChangeLogForm')
  ) {
    tabs.push(changeLogTab);
  }

  return (
    <div className={styles.container}>
      {tabs}
    </div>
  );
};

export default Tabs;
