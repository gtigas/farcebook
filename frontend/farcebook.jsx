import React from 'react';
import ReactDOM from 'react-dom';
import { login, logout } from './actions/session_actions'
import configureStore from './store/store'
import Root from './components/root'
import moment from 'moment'
import { fetchTrending } from './util/trending_api_util'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
       session: {currentUser: window.currentUser },
       ui: { modal: {},
            loading: true,
            feedLoading: false,
            trendLoading:true
          }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.dispatch = store.dispatch;

  window.fetchTrending = fetchTrending;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
