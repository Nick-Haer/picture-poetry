import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './saved-poems.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import Alert from '../../components/Alert';

const SavedPoem = props => {
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
      console.log('unsaving...');
      const newPoems = [...poems];
      const savedPoem = newPoems[index];
      console.log(savedPoem._id);
      const newData = await axios.delete(
        `api/poems/unSavePoem/${savedPoem._id}`
      );
      console.log(newData);
      setPoemData({ poems: newData.data });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      {poems.length > 0
        ? poems.map((poem, index) => (
            <div key={poem._id} className='poem-container'>
              <img
                className='poem-picture'
                alt='MET photo'
                src={poem.picture}
              />
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
        : null}
    </section>
  );
};

SavedPoem.propTypes = {};

export default connect(null, { createAlert })(SavedPoem);
