import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import _ from 'lodash';

const UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS: {
      return _.merge({}, state, action.users)
    }
    case RECEIVE_USER: {
      return _.merge({}, state, { [action.user.id]: action.user} )
    }
    default:
      return state;
  }
}

export default UsersReducer;
