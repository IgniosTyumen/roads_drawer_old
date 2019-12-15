import {combineReducers} from 'redux';
import schema from './schema';
import notify from './notify';
import user from './user';

export default combineReducers({
  schema,
  notify,
  user,
});
