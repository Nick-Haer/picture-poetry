import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './my-poems.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import Alert from '../../components/Alert';
import './my-poems.css';
const MyPoems = ({ createAlert }) => {
  const [poemData, setPoemData] = useState({
    poems: [],
  });

  const { poems } = poemData;

  useEffect(() => {
    async function getAllPoems() {
      try {
        const poemsList = await axios.get('/api/poems/getMyPoems');

        setPoemData({ poems: poemsList.data });
      } catch (error) {
        console.error(error);
      }
    }
    getAllPoems();
  }, []);

  const deletePoem = async (event, index) => {
    try {
      event.preventDefault();
      const newPoems = [...poems];
      const deletePoem = newPoems[index];
      console.log(deletePoem);
      const currentPoems = await axios.delete(
        `api/poems/deleteOnePoem/${deletePoem._id}`
      );
      setPoemData({ poems: currentPoems.data });
      createAlert('Poem Succesfully Deleted', 'confirm');
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
              onClick={event => deletePoem(event, index)}
              className='save-button'>
              Delete Poem
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

MyPoems.propTypes = {};

export default connect(null, { createAlert })(MyPoems);
