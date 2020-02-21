import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../Actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/my-poems' />;
  }

  return (
    <section className='login'>
      <div id='login-box'>
        <h3 className='login-title'>Login Here</h3>
        <form onSubmit={event => onSubmitHandler(event)}>
          <input
            className='login-input'
            name='email'
            placeholder='Email Address'
            type='email'
            value={email}
            onChange={event => onChangeHandler(event)}
          />
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={event => onChangeHandler(event)}
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

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, { login })(Login);
