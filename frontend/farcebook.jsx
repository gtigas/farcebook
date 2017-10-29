import React from 'react';
import ReactDOM from 'react-dom';
import { login, logout } from './actions/session_actions'
import configureStore from './store/store'
import Root from './components/root'
import  { createComment, updateComment, deleteComment } from './actions/comments_actions'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: {currentUser: window.currentUser }};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.dispatch = store.dispatch;
  window.createComment = createComment;
  window.updateComment = updateComment;
  window.deleteComment = deleteComment;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
