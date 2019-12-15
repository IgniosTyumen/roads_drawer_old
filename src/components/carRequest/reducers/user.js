import {FETCH_USER_REQUEST, FETCH_USER_SUCCESS,} from '../constants/User';

const initialState = {
  fetching: false,
  data: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.user,
      };
    default:
      return state;
  }
}
