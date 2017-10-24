import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const defaultState = {
  currentUser: null,
  errors: [],
};

const SessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const currentUser = action.user;
      return merge({}, state, { currentUser });
    }
    default:
      return state;
  }
};

export default SessionReducer;
