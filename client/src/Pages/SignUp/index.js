import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './signup.css';

const SignUp = props => {
  return (
    <section class='signup'>
      <div id='signup-box'>
        <h3 className='signup-title'>Sign Up Here</h3>
        <form>
          <input
            className='signup-input'
            name='email'
            placeholder='Email Address'
            type='email'
          />
          <input
            className='signup-input'
            name='username'
            type='text'
            placeholder='Username'
          />
          <input
            className='signup-input'
            name='password'
            type='password'
            placeholder='Password'
          />
          <input
            className='signup-input'
            name='password2'
            type='password'
            placeholder='Confirm Password'
          />
          <button className='signup-input signup-btn' type='submit' value=''>
            Submit
          </button>
        </form>

        <hr className='divider' />

        <p className='login-text'>
          Already have an account? Login{' '}
          <Link to='/login' className='link-to-login'>
            here
          </Link>
        </p>
      </div>
    </section>
  );
};

SignUp.propTypes = {};

export default SignUp;
