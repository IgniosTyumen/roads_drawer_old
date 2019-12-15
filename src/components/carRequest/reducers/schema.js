import {FETCH_SCHEMA_REQUEST, FETCH_SCHEMA_SUCCESS,} from '../constants/Schema';

const initialState = {
  fetching: false,
  data: null,
};

export default function schema(state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEMA_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_SCHEMA_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.schema,
      };
    default:
      return state;
  }
}
