import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  alert('asdf')
  window.signup = SessionUtil.signup;
  window.login = SessionUtil.login;
  window.logout = SessionUtil.logout;
});
