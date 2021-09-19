import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../App.css';
import { connect } from 'react-redux';
import { createAlert } from '../../Actions/alert';
import wave from '../../assets/wave.jpeg';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const GuestPoemsSearch = ({ isAuthenticated }) => {
  const [poemData, setPoemData] = useState({
    poems: [],
  });

  const [poemFilter, setPoemFilter] = useState({
    selectedName: '',
    includedString: '',
  });

  const { poems } = poemData;
  const { selectedName, includedString } = poemFilter;

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

  console.log(selectedName, 'select');
  console.log(includedString, 'included');

  const poemSort = (poemTitle) => {
    if ((selectedName && selectedName === poemTitle) 
    || (includedString && poemTitle.toLowerCase().includes(includedString.toLowerCase()))
    || (!selectedName && !includedString)) {
      return true;
    }
    return false;
  }

  let poemsToDisplay = [];

  if (poems && poems.length > 0) {
    poemsToDisplay = [...poems.filter(({title}) => poemSort(title))] 
  }

  return (
    <section style={{height: '100vh'}}>
      <Autocomplete
        id="combo-box-demo"
        className="autocompleteSearch"
        options={(poems && poems.length > 0) ? [...poems]
          .sort((a, b) => a.title.localeCompare(b.title)) : []}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        onChange={(e, newVal) => {
          if (!newVal) {
            setPoemFilter({includedString: '', selectedName: ''})
          } else {
            setPoemFilter({includedString: '', selectedName: newVal.title})
          }
        }}
        onInputChange={(e, newVal) => {
          if (!newVal) {
            setPoemFilter({includedString: '', selectedName: ''})
          } else {
            setPoemFilter({includedString: newVal, selectedName: ''})
          }
        }}
        renderInput={(params) => <TextField {...params} label="Search Poems" variant="outlined" />}
        clearOnEscape={false}
      />
      <div className="guest-poem-box">
        {poemsToDisplay.length > 0 ? (
          poemsToDisplay.slice().sort((a, b) => a.title.localeCompare(b.title))
          .map((poem) => (
            <div key={poem._id} className='poem-container'>
              <img className='poem-picture' alt='MET' src={poem.picture} />
              <div className='picture-with-text'>
                <h1 className='poem-title'>{poem.title}</h1>
                <p className='poem-text'>{poem.text}</p>
              </div>
            </div>
          ))
        ) : (
          <>
          {poems && poems.length === 0 && (
            <>
              <img alt="placeholder wave when no poems found" className='no-poems-wave-pic' src={wave}></img>
              <div className='no-poems-found'>
                <p>No poems here yet. Go ahead and write some to share!</p>
              </div>
            </>
          )}
          {poems && poems.length > 0 && poemsToDisplay.length === 0 && (
            <>
              <img alt="placeholder wave when no poems to display found" className='no-poems-wave-pic' src={wave}></img>
              <div className='no-poems-found'>
                <p>No poems matched that search</p>
              </div>
            </>
          )} 
          </>
        )}
      </div>

    </section>
  );
};

GuestPoemsSearch.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { createAlert })(GuestPoemsSearch);
