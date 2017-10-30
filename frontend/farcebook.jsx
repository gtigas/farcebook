import React from 'react';
import ReactDOM from 'react-dom';
import { login, logout } from './actions/session_actions'
import configureStore from './store/store'
import Root from './components/root'
import * as LikeAPI from './util/likes_api_util'

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

  window.likeComment = LikeAPI.likeComment;
  window.likePost = LikeAPI.likePost;
  window.unlikeComment = LikeAPI.unlikeComment;
  window.unlikePost = LikeAPI.unlikePost;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
