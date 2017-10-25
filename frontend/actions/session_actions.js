import * as SessionApiUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';


export const receiveCurrentUser = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

export const receiveErrors = (errors, errorType) => {
  return {
    type: RECEIVE_ERRORS,
    errors,
    errorType
  };
};

export const login = (user) => dispatch => {
  return SessionApiUtil.login(user).then(
    (user) => {
      dispatch(receiveCurrentUser(user));
    },
    (errors) => {
      dispatch(receiveErrors(errors, 'login'));
    }
  );
};

export const signup = (user) => dispatch => {
  return SessionApiUtil.signup(user).then(
    (user) => {
      dispatch(receiveCurrentUser(user));
    },
    (errors) => {
      dispatch(receiveErrors(errors, 'signup'));
    }
  );
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(
    () => {
      dispatch(receiveCurrentUser(null));
    },
    (errors) => {
      dispatch(receiveErrors(errors));
    }
  );
};
