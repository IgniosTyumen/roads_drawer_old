import {OPEN_MODAL,} from '../constants/Notify';

export const openModal = carRequestId => ({
  type: OPEN_MODAL,
  carRequestId,
});
