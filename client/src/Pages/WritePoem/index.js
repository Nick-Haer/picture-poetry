import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { randomMetPainting } from '../../utils/getPainting';
import raven from '../../components/NavBar/raven.png';
import './write.css';

const Write = props => {
  const [paintingData, setPaintingData] = useState({
    paintingUrl: '',
  });

  const { paintingUrl } = paintingData;

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
          <hr className='fancy-line-top'></hr>
          <textarea
            autoFocus
            className='poem-input'
            cols='30'
            rows='15'></textarea>
          <hr className='fancy-line-bottom'></hr>
          <div className='button-box'>
            <button className='poem-write-button'>Post</button>
            <button className='poem-write-button'>Save</button>
          </div>
        </div>
      </div>
    </section>
  );
};

Write.propTypes = {};

export default connect()(Write);
