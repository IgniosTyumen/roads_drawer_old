import React from 'react';
import {connect} from 'react-redux';
import {getSchema} from '~/components/carRequest/actions/SchemaActions';
import {getUser} from '~/components/carRequest/actions/UserActions';
import {SCHEMA_SHORT_URL} from '~/components/carRequest/config.js';
import styles from './RequestPage.css';
import TablePage from '~/components/carRequest/components/TablePage';

class RequestPage extends React.Component {
  componentDidMount() {
    this.props.getSchema(SCHEMA_SHORT_URL);
    this.props.getUser();
  }

  render() {
    const { schema, notifyId, user } = this.props;
    return (
      <div className={styles.container}>
        <TablePage schema={schema} notifyId={undefined} user={undefined}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schema: state.schema.schema,
});

const mapDispatchToProps = {
  getSchema,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
