import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../App.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import Alert from '../../components/Alert';
import wave from '../../assets/wave.jpeg';

const SavedPoem = ({ createAlert }) => {
  const [poemData, setPoemData] = useState({
    poems: [],
  });

  const { poems } = poemData;

  useEffect(() => {
    async function getAllPoems() {
      try {
        const poemsList = await axios.get('/api/poems/getSavedPoems');
        console.log(poemsList);
        setPoemData({ poems: poemsList.data });
      } catch (error) {
        console.error(error);
      }
    }
    getAllPoems();
  }, []);

  const unSavePoem = async (event, index) => {
    try {
      event.preventDefault();
      const newPoems = [...poems];
      const savedPoem = newPoems[index];
      const newData = await axios.delete(
        `api/poems/unSavePoem/${savedPoem._id}`
      );
      console.log(newData);
      setPoemData({ poems: newData.data });
      createAlert(
        'Poem removed from saved list. You can still re-save it if you like',
        'confirm'
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <div className='page-title'>Saved Poems</div>
      {poems.length > 0 ? (
        poems.map((poem, index) => (
          <div key={poem._id} className='poem-container'>
            <img className='poem-picture' alt='MET photo' src={poem.picture} />
            <div className='picture-with-text'>
              <h1 className='poem-title'>{poem.title}</h1>
              <p className='poem-text'>{poem.text}</p>
              <button
                onClick={event => unSavePoem(event, index)}
                className='save-button'>
                Remove from Saved List
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <img className='no-poems-wave-pic' src={wave}></img>
          <div className='no-poems-found'>
            <p>
              No saved poems yet. Check out the work of your fellow picture
              poets, and save the ones that strike you
            </p>
          </div>
        </>
      )}
    </section>
  );
};

SavedPoem.propTypes = {};

export default connect(null, { createAlert })(SavedPoem);
