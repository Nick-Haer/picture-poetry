import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './poems-search.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import Alert from '../../components/Alert';

const PoemsSearch = ({ createAlert }) => {
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

  const savePoem = async (event, index) => {
    try {
      event.preventDefault();
      const newPoems = [...poems];
      const savedPoem = newPoems[index];
      await axios.put(`api/poems/save/${savedPoem._id}`);
      createAlert('Poem Saved', 'confirm');
    } catch (error) {
      console.error(error);
      createAlert(error, 'warning');
    }
  };
  return (
    <section>
      {poems.map((poem, index) => (
        <div key={poem._id} className='poem-container'>
          <img className='poem-picture' alt='MET photo' src={poem.picture} />
          <div className='picture-with-text'>
            <h1 className='poem-title'>{poem.title}</h1>
            <p className='poem-text'>{poem.text}</p>
            <button
              onClick={event => savePoem(event, index)}
              className='save-button'>
              Save Poem
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

PoemsSearch.propTypes = {};

export default connect(null, { createAlert })(PoemsSearch);
