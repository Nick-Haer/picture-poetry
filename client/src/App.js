import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Landing from './Pages/LandingPage';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
