import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { REMOVE_REQUEST } from '../actions/friends_actions'
import _ from 'lodash';

const UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS: {
      return _.merge({}, state, action.users)
    }
    case RECEIVE_USER: {
      return _.merge({}, state, { [action.user.id]: action.user} )
    }
    case REMOVE_REQUEST: {
      const newUsers = { [action.requester.id]: action.requester,
                          [action.receiver.id]: action.receiver}
      const customizer = (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return srcValue;
        }
      }
      return _.mergeWith({}, state , newUsers, customizer);
    }
    default:
      return state;
  }
}

export default UsersReducer;
