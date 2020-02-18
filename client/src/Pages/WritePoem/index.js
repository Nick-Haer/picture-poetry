import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { randomMetPainting } from '../../utils/getPainting';
import raven from '../../components/NavBar/raven.png';
import './write.css';
import { createAlert } from '../../Actions/alert';

const Write = ({ createAlert }) => {
  const [paintingData, setPaintingData] = useState({
    paintingUrl: '',
    title: '',
    text: '',
  });

  const { paintingUrl, title, text } = paintingData;

  const onChangeHandler = event => {
    setPaintingData({
      ...paintingData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/poems', {
        picture: paintingUrl,
        title,
        text,
      });
    } catch (error) {
      const err = error.response.data;
      createAlert(err, 'warning');
      console.error(err);
    }
  };

  useEffect(() => {
    randomMetPainting()
      .then(url => {
        setPaintingData({ ...paintingData, paintingUrl: url });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <section>
      <div className='poet-content'>
        <img
          className='met-painting'
          src={paintingUrl}
          alt='A beautiful painting from the MET'></img>
        <div className='text-box-area'>
          <input
            className='poem-title'
            placeholder='Title Your Poem'
            type='text'
            name='title'
            onChange={event => onChangeHandler(event)}
          />
          <hr className='fancy-line-top'></hr>
          <textarea
            autoFocus
            className='poem-input'
            cols='30'
            rows='15'
            name='text'
            onChange={event => onChangeHandler(event)}></textarea>
          <hr className='fancy-line-bottom'></hr>
          <div className='button-box'>
            <button
              onClick={event => onSubmitHandler(event)}
              className='poem-write-button'>
              Save and Post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Write.propTypes = {};

export default connect(null, { createAlert })(Write);
