import { SIGNUP_FAILURE, SIGNUP_SUCCESS } from './types';

export const signup = dispatch => {
  dispatch({
    type: SIGNUP_SUCCESS,
    payload: 'testing123',
  });
};
