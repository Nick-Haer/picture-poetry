import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const setAuthHeaders = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthHeaders;
