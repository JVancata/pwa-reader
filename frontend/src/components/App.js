import React, { Component } from 'react';
import history from '../history/history';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../store';
import { Provider } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';

import Reader from './reader/reader';

// CSS
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../css/global.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <Switch>
              <Route default component={Reader} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
