import { SIGNUP_FAILURE, SIGNUP_SUCCESS } from './types';
import axios from 'axios';

export const signup = (username, email, password) => dispatch => {
  const userData = { username, email, password };

  dispatch({
    type: SIGNUP_SUCCESS,
    payload: 'testing123',
  });
};

export const login = (email, password) => dispatch => {};

// function signup() {
//   function dispatch() {}
// }

// Poem Thoughts

// •	Each poem has a thumbnail image,
// •	A searched poem can be saved,
// •	A saved poem can be unsaved
