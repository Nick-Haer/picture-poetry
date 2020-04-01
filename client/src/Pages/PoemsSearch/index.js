import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../App.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import Alert from '../../components/Alert';
import wave from '../../assets/wave.jpeg';

const PoemsSearch = ({ createAlert }) => {
  const [poemData, setPoemData] = useState({
    poems: [],
  });

  const { poems } = poemData;

  useEffect(() => {
    async function getAllPoems() {
      try {
        const poemsList = await axios.get('/api/poems/check/myPoems/saved');
        console.log('getting poems');
        setPoemData({ poems: poemsList.data });
      } catch (error) {
        console.error(error);
      }
    }
    getAllPoems();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const savePoem = async (event, index) => {
    try {
      event.preventDefault();
      const newPoems = [...poems];
      const savedPoem = newPoems[index];
      await axios.put(`api/poems/save/${savedPoem._id}`);
      const poemsList = await axios.get('/api/poems/check/myPoems/saved');
      setPoemData({ poems: poemsList.data });
      createAlert('Poem Saved', 'confirm');
    } catch (error) {
      console.error(error);
      //if the error comes from a lack of jsonwebtoken
      if (error.response.data) {
        createAlert(error.response.data, 'warning');
      } else {
        //any other error
        createAlert(error, 'warning');
      }
      scrollToTop();
    }
  };
  return (
    <section>
      <div className='page-title'>All Poems</div>
      {poems.length > 0 ? (
        poems.map((poem, index) => (
          <div key={poem._id} className='poem-container'>
            <img className='poem-picture' alt='MET photo' src={poem.picture} />
            <div className='picture-with-text'>
              <h1 className='poem-title'>{poem.title}</h1>
              <p className='poem-text'>{poem.text}</p>
              {poem.saved ? (
                <div className='saved-confirmation'>Poem Saved</div>
              ) : (
                <button
                  onClick={event => savePoem(event, index)}
                  className='save-button'>
                  Save Poem
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <>
          <img className='no-poems-wave-pic' src={wave}></img>
          <div className='no-poems-found'>
            <p>No poems here yet. Go ahead and write some!</p>
          </div>
        </>
      )}
    </section>
  );
};

PoemsSearch.propTypes = {};

export default connect(null, { createAlert })(PoemsSearch);
