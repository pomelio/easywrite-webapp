// @flow

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'


import './App.css';
import Space from './screens/Space';
import Article from './screens/Article';
import { createBrowserHistory } from 'history';
var history = createBrowserHistory();


history.listen(function (location) {
    //window.ga('send', 'pageview', location.pathname);
    //window.ga('myTracker.send', 'pageview', location.pathname);
});

class App extends Component {

  render() {
    return (
      <div className="flex-center" >
        <Router history={history}>
            <Switch>
              <Route exact path={'/'} component={() => <Space />}/>
              <Route exact path={'/1/web/space/:spaceID'} component={() => <Space />}/>
              <Route path={'/1/web/article/:articleID'} component={() => <Article />}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
