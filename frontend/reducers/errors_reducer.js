import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions';
import _ from 'lodash';

const defaultState = { login:[], signup:[] }


const ErrorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER : {
      return { login: [], signup: [] }
    }
    case RECEIVE_ERRORS : {
      const errors = action.errors.responseJSON;
      return _.merge({}, state, { [action.errorType]: errors })
    }
    default:
      return state;
  }
};

export default ErrorsReducer;
