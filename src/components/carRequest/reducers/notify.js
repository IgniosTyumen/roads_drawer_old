import {OPEN_MODAL,} from '../constants/Notify';

const initialState = {
  carRequestId: null,
};

export default function notify(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        carRequestId: action.carRequestId,
      };
    default:
      return state;
  }
}
