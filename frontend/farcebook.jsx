import React from 'react';
import ReactDOM from 'react-dom';
import { login, logout } from './actions/session_actions'
import configureStore from './store/store'
import Root from './components/root'
import { fetchPosts, createPost, updatePost, deletePost } from './actions/posts_actions'

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
  window.fetchPosts = fetchPosts;
  window.createPost = createPost;
  window.updatePost = updatePost;
  window.deletePost = deletePost;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
