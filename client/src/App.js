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

//Redux

import { Provider } from 'react-redux';
import store from './store';
import { checkToken } from './Actions/auth';

if (localStorage.token) {
  setAuthHeaders(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(checkToken(localStorage.token));
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
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
