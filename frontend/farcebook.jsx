import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionUtil from './util/session_api_util';
import { login, logout } from './actions/session_actions'
import configureStore from './store/store'
import Root from './components/root'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: {currentUser: window.currentUser }};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.store = store;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
