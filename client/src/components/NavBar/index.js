import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './nav.css';
import raven from './raven.png';

const NavBar = props => {
  return (
    <nav className='navbar'>
      <Link className='image-link' to='/landing'>
        <img id='raven-image' src={raven} alt='Raven' />
      </Link>

      <h3 id='title-text'>Picture Poetry</h3>
      <div id='nav-links'>
        <Link className='nav-link' to='/poems'>
          Poems
        </Link>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
        <Link className='nav-link' to='/signup'>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
