import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';

import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';
import MyNavBar from '../components/pages/MyNavBar/MyNavBar';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import GameDetail from '../components/pages/GameDetail/GameDetail';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
  }, []);

  return (
    <div className="App">
       <BrowserRouter>
          <React.Fragment>
            <MyNavBar authed={authed} />
              <div className="container">
                <Switch>
                  <PrivateRoute path="/home" component={Home} authed={authed} />
                  {/* <PrivateRoute path="/newGame" component={NewItem} authed={authed} /> */}
                  <PrivateRoute path="/game/:gameId" component={GameDetail} authed={authed} />
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <Redirect from="*" to="/home" />
                </Switch>
              </div>
          </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
