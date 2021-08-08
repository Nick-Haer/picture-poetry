import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { randomMetPainting } from '../../utils/getPainting';
import raven from '../../assets/raven.png';
import frame from '../../assets/frame.png';
import '../../App.css';
import { createAlert } from '../../Actions/alert';

const Write = ({ createAlert }) => {
  const [paintingData, setPaintingData] = useState({
    paintingUrl: '',
    title: '',
    text: '',
  });

  const { paintingUrl, title, text } = paintingData;

  console.log(title);

  useEffect(() => {
    randomMetPainting()
      .then(url => {
        setPaintingData({ ...paintingData, paintingUrl: url });
      })
      .catch(err => console.log(err));
  }, []);

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
      createAlert('Poem Posted!', 'confirm');
      scrollToTop();
    } catch (error) {
      const err = error.response.data;
      createAlert(err, 'warning');
      scrollToTop();
      console.error(err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const textAreaNewLines = event => {
    if (event.key === 'Enter') {
      const lettersArray = event.target.value.split('');
      const lineBreaked = lettersArray.concat('<br>');
      const textData = lineBreaked.join('');
      setPaintingData({
        ...paintingData,
        [event.target.name]: textData,
      });
    }
  };

  return (
    <section>
      <div className='poet-content'>
        <img
          className='met-painting'
          src={paintingUrl}
          alt='A beautiful painting from the MET'
        />
        <div className='text-box-area'>
          <input
            className='poem-title-input'
            placeholder='Title Your Poem'
            type='text'
            name='title'
            onChange={event => onChangeHandler(event)}
          />
          <textarea
            autoFocus
            className='poem-input'
            cols='40'
            rows='15'
            name='text'
            onChange={event => onChangeHandler(event)}
            onKeyPress={event => textAreaNewLines(event)}
          />
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
