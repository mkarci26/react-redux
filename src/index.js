import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Router, Route, Switch } from 'react-router-dom';

import App from './app';

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>

), document.getElementById('root'));
