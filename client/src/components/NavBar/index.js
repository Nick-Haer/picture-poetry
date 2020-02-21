import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App.css';
import raven from '../../assets/raven.png';
import { connect } from 'react-redux';
import { logout } from '../../Actions/auth';

const NavBar = ({ isAuthenticated, loading, logout }) => {
  const logoutHandler = event => {
    event.preventDefault();
    logout();
  };

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
      <Link onClick={event => logoutHandler(event)} className='nav-link' to='/'>
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

export default connect(mapStateToProps, { logout })(NavBar);
