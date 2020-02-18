import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './nav.css';
import raven from './raven.png';
import { connect } from 'react-redux';

const NavBar = ({ isAuthenticated, loading }) => {
  const publicLinks = (
    <>
      <Link className='nav-link' to='/poems'>
        Poems
      </Link>
      <Link className='nav-link' to='/login'>
        Login
      </Link>
      <Link className='nav-link' to='/signup'>
        Sign Up
      </Link>
    </>
  );

  const privateLinks = (
    <>
      <Link className='nav-link' to='/poems-search'>
        Poems
      </Link>
      <Link className='nav-link' to='/write-poem'>
        Write
      </Link>
      <Link className='nav-link' to='/my-poems'>
        My Poems
      </Link>
      <Link className='nav-link' to='/saved-poems'>
        Saved Poems
      </Link>
      <Link className='nav-link' to='/logout'>
        Logout
      </Link>
    </>
  );

  return (
    <nav className='navbar'>
      <Link className='image-link' to='/'>
        <img id='raven-image' src={raven} alt='Raven' />
      </Link>
      <h3 id='title-text'>Picture Poetry</h3>
      <div id='nav-links'>
        {' '}
        {isAuthenticated && !loading ? privateLinks : publicLinks}
      </div>
    </nav>
  );
};

NavBar.propTypes = {};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(NavBar);
