import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Lobby from './pages/Lobby'
import PartyRoom from './pages/PartyRoom'
 
import PrivateRoute from './PrivateRoute';

import './Normalize.css';
import './App.css';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import Landing from 'pages/Landing';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} /> {/*hedhiii awel page */}
        <PrivateRoute exact path="/lobby" component={Lobby} />   {/*hedhiii page thenya */}
        <PrivateRoute path="/:roomId" component={PartyRoom} />
      </Switch>
    </Router>
  );
}

export default App;
