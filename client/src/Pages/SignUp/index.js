import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../Actions/auth';
import { createAlert } from '../../Actions/alert';
import '../../App.css';

const SignUp = ({ doSignup, doCreateAlert, isAuthenticated }) => {
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
      doCreateAlert('Passwords do not match', 'warning');
    } else {
      doSignup(username, email, password);
    }
  };

  const onChangeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to='/poems-search' />;
  }

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

SignUp.propTypes = {
  doSignup: PropTypes.func.isRequired,
  doCreateAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, { doSignup: signup, doCreateAlert: createAlert })(SignUp);
