import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions';
import _ from 'lodash';

const defaultState = { login:[],
                      signup:[],
                      posts: [],
                      comments: [],}


const ErrorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER : {
      return defaultState;
    }
    case RECEIVE_ERRORS : {
      const errors = action.errors.responseJSON;
      return _.merge({}, defaultState, { [action.errorType]: errors })
    }
    default:
      return defaultState;
  }
};

export default ErrorsReducer;
