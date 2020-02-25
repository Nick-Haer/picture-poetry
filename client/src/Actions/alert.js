import { CREATE_ALERT, DELETE_ALERT } from './types';
import uuidv4 from 'uuid/v4';

export const createAlert = (message, alertType) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: CREATE_ALERT,
    payload: {
      id,
      message,
      alertType,
    },
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_ALERT,
      payload: id,
    });
  }, 5000);
};
