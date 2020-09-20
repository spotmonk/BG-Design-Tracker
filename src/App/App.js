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
import VersionDetail from '../components/pages/VersionDetail/VersionDetail';
import NewGame from '../components/pages/NewGame/NewGame';
import NewVersion from '../components/pages/NewVersion/NewVersion';
import PlaytestDetail from '../components/pages/PlaytestDetail/PlaytestDetail';
import NewPlaytest from '../components/pages/NewPlaytest/NewPlaytest';
import EditGame from '../components/pages/EditGame/EditGame';
import EditVersion from '../components/pages/EditVersion/EditVersion';
import EditPlaytest from '../components/pages/EditPlaytest/EditPlaytest';
import NewFeedback from '../components/pages/NewFeedback/NewFeedback';
// import AuthedFeedback from '../components/pages/AuthedFeedback/AuthedFeedback';
import FeedbackDetail from '../components/pages/FeedbackDetail/FeedbackDetail';

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
                  <PrivateRoute path="/newGame" component={NewGame} authed={authed} />
                  <PrivateRoute path="/game/:gameId" component={GameDetail} authed={authed} />
                  <PrivateRoute path="/editgame/:gameId" component={EditGame} authed={authed} />
                  <PrivateRoute path="/playtest/:playtestId" component={PlaytestDetail} authed={authed} />
                  <PrivateRoute path="/editplaytest/:playtestId" component={EditPlaytest} authed={authed} />
                  <PrivateRoute path="/newversion/" component={NewVersion} authed={authed} />
                  <PrivateRoute path="/newplaytest/" component={NewPlaytest} authed={authed} />
                  <PrivateRoute path="/editversion/:versionId" component={EditVersion} authed={authed} />
                  <PrivateRoute path="/version/:versionId" component={VersionDetail} authed={authed} />
                  <PrivateRoute path="/feedback/:feedbackId" component={FeedbackDetail} authed={authed} />
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PublicRoute path="/feedback" component={NewFeedback} authed={authed} />
                  <Redirect from="*" to="/home" />
                </Switch>
              </div>
          </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
