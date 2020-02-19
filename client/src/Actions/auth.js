import {
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_FOUND,
  NO_TOKEN_FOUND,
  LOGOUT,
} from './types';
import axios from 'axios';
import { createAlert } from './alert';

export const signup = (username, email, password) => async dispatch => {
  const userData = { username, email, password };

  try {
    const res = await axios.post('/api/users', userData);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    //check if errors are returned, and if there are any, make an alert out of them. Some are created errors, with a message, while others are just strings sent back as an array to interface with the forEach
    if (errors) {
      errors.forEach(err => {
        dispatch(createAlert(err.msg || err, 'warning'));
      });

      dispatch({
        type: SIGNUP_FAILURE,
      });
    }
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    // more descriptive errors from validator?
    if (errors) {
      errors.forEach(err => {
        dispatch(createAlert(err.msg || err, 'warning'));
      });

      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  }
};

export const checkToken = token => dispatch => {
  if (token) {
    console.log('token found ' + token);
    dispatch({
      type: TOKEN_FOUND,
      payload: token,
    });
  } else {
    dispatch({
      type: NO_TOKEN_FOUND,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};

// Poem Thoughts

// •	Each poem has a thumbnail image,
// •	A searched poem can be saved,
// •	A saved poem can be unsaved
