import { SIGNUP_FAILURE, SIGNUP_SUCCESS } from './types';
import axios from 'axios';
import { createAlert } from './alert';

export const signup = (username, email, password) => async dispatch => {
  const userData = { username, email, password };
  console.log('data');
  console.log(userData);

  try {
    const res = await axios.post('/api/users', userData);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data.errors);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => {
        console.log(err);
        dispatch(createAlert(err.msg || err, 'warning'));
      });

      dispatch({
        type: SIGNUP_FAILURE,
      });
    }
  }
};

export const login = (email, password) => dispatch => {};

// function signup() {
//   function dispatch() {}
// }

// Poem Thoughts

// •	Each poem has a thumbnail image,
// •	A searched poem can be saved,
// •	A saved poem can be unsaved
