import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions';
import _ from 'lodash';

const defaultState = { login:[] }


const ErrorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER : {
      return { login: [] }
    }
    case RECEIVE_ERRORS : {
      const login = action.errors.responseJSON;
      return _.merge({}, state, { login })
    }
    default:
      return state;
  }
};

export default ErrorsReducer;
