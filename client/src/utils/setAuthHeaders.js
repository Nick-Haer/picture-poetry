import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//header not being sent
//data leak
//find where config password printed
//token found putting in endefined webtokens
const setAuthHeaders = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    console.log(axios.defaults.headers.common['x-auth-token']);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthHeaders;
