import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../Actions/types';
const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        payload,
      };
    default:
      return {
        ...state,
      };
  }
};
