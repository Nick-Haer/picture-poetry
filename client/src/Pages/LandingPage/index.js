import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import { signup } from '../../Actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/poems-search' />;
  }

  return (
    <section id='about'>
      <p className='about-text'>
        Picture Poetry is dedicated to the creation and sharing of poetry
        inspired by fine art. Each day, a new topic is chosen at random. Poets
        then receieve a painting, also selected randomly, from all that match
        the topic.
      </p>
      <p className='about-text'>
        Write to frame with elegant words a work of beauty, or illustrate dark
        meanings hidden in the shaded edges. Let your creativity guide you on
        the journey of Picture Poetry!
      </p>
    </section>
  );
};

Landing.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
// export default Landing;
