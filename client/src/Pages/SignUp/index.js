import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../Actions/auth';
import { createAlert } from '../../Actions/alert';
import './signup.css';

const SignUp = ({ signup, createAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const { email, username, password, password2 } = formData;

  const submitHandler = event => {
    event.preventDefault();
    if (password !== password2) {
      createAlert('Passwords do not match', 'warning');
    } else {
      signup(email, username, password);
    }
  };

  const onChangeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <section className='signup'>
      <div id='signup-box'>
        <h3 className='signup-title'>Sign Up Here</h3>
        <form onSubmit={e => submitHandler(e)}>
          <input
            className='signup-input'
            name='email'
            placeholder='Email Address'
            type='email'
            value={email}
            onChange={onChangeHandler}
          />
          <input
            className='signup-input'
            name='username'
            type='text'
            placeholder='Username'
            value={username}
            onChange={onChangeHandler}
          />
          <input
            className='signup-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={onChangeHandler}
          />
          <input
            className='signup-input'
            name='password2'
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={onChangeHandler}
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

export default connect(null, { signup, createAlert })(SignUp);
