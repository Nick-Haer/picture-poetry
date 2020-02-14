import React from 'react';
import PropTypes from 'prop-types';
import './login.css';
import { Link } from 'react-router-dom';

const Login = props => {
  return (
    <section className='login'>
      <div id='login-box'>
        <h3 className='login-title'>Login Here</h3>
        <form>
          <input
            className='login-input'
            name='email'
            placeholder='Email Address'
            type='email'
          />
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
          />
          <button className='login-input login-btn' type='submit' value=''>
            Submit
          </button>
        </form>

        <hr className='divider' />

        <p className='login-text'>
          Don't yet have an account? Sign up{' '}
          <Link to='/signup' className='link-to-login'>
            here
          </Link>
        </p>
      </div>
    </section>
  );
};

Login.propTypes = {};

export default Login;
