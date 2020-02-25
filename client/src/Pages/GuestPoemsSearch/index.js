import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../App.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import Alert from '../../components/Alert';
import wave from '../../assets/wave.jpeg';
import { Redirect } from 'react-router-dom';

const GuestPoemsSearch = ({ createAlert, isAuthenticated }) => {
  const [poemData, setPoemData] = useState({
    poems: [],
  });

  const { poems } = poemData;

  useEffect(() => {
    async function getAllPoems() {
      try {
        const poemsList = await axios.get('/api/poems');
        setPoemData({ poems: poemsList.data });
      } catch (error) {
        console.error(error);
      }
    }
    getAllPoems();
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/poems-search' />;
  }

  return (
    <section>
      {poems.length > 0 ? (
        poems.map((poem, index) => (
          <div key={poem._id} className='poem-container'>
            <img className='poem-picture' alt='MET photo' src={poem.picture} />
            <div className='picture-with-text'>
              <h1 className='poem-title'>{poem.title}</h1>
              <p className='poem-text'>{poem.text}</p>
            </div>
          </div>
        ))
      ) : (
        <>
          <img className='no-poems-wave-pic' src={wave}></img>
          <div className='no-poems-found'>
            <p>No poems here yet. Go ahead and write some to share!</p>
          </div>
        </>
      )}
    </section>
  );
};

GuestPoemsSearch.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { createAlert })(GuestPoemsSearch);
