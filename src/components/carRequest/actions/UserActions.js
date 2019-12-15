import axios from 'axios';
import {FETCH_USER_REQUEST, FETCH_USER_SUCCESS,} from '../constants/User';

const userRequest = () => ({
  type: FETCH_USER_REQUEST,
});

const userSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user,
});

// const userFailure = () => ({
//   type: FETCH_USER_FAILURE,
// });

export const getUser = () => (dispatch) => {
  dispatch(userRequest());

  axios.get('https://av.admtyumen.ru/current_user_params', {
    params: {
      _dc: (new Date()).getTime(),
    },
  })
    .then(res => dispatch(userSuccess(res.data)));
};
