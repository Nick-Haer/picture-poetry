import React, { useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Landing from './Pages/LandingPage';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Alert from './components/Alert';
import PrivateRoute from './PrviateRoute/PrivateRoute';
import WritePoem from './Pages/WritePoem';
import setAuthHeaders from './utils/setAuthHeaders';
import PoemsSearch from './Pages/PoemsSearch';
import MyPoems from './Pages/MyPoems';
import SavedPoems from './Pages/SavedPoems';

//Redux

import { Provider } from 'react-redux';
import store from './store';
import { checkToken } from './Actions/auth';

function App() {
  //this isn't running
  if (localStorage.jsonwebtoken && localStorage.jsonwebtoken !== 'undefined') {
    console.log('setting auth headers');
    console.log(localStorage);
    console.log(localStorage.jsonwebtoken);
    console.log('token found in app');
    setAuthHeaders(localStorage.jsonwebtoken);
  } else {
    console.log('did not set auth headers');
  }

  useEffect(() => {
    console.log('checked token');
    console.log(localStorage.jsonwebtoken);
    store.dispatch(checkToken(localStorage.jsonwebtoken));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <NavBar />
          <Alert />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/write-poem' component={WritePoem} />
            <PrivateRoute exact path='/poems-search' component={PoemsSearch} />
            <PrivateRoute exact path='/my-poems' component={MyPoems} />
            <PrivateRoute exact path='/saved-poems' component={SavedPoems} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
