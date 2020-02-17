import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '../Actions/types';
const initialState = {
  isAuthenticated: false,
  loading: true,
  token: localStorage.getItem('jsonwebtoken'),
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('jsonwebtoken', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      localStorage.removeItem('jsonwebtoken');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
