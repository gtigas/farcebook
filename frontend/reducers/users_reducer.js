import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { REMOVE_REQUEST } from '../actions/friends_actions'
import { RECEIVE_POST, REMOVE_POST, RECEIVE_FEED } from '../actions/posts_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { customizer } from '../util/action_util'
import _ from 'lodash';

const UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS: {
      return _.merge({}, state, action.users)
    }
    case RECEIVE_FEED: {
      return _.merge({}, state, action.users)
    }
    case RECEIVE_USER: {
      return _.merge({}, state, { [action.user.id]: action.user} )
    }
    case REMOVE_REQUEST: {
      const newUsers = { [action.requester.id]: action.requester,
                          [action.receiver.id]: action.receiver}
      return _.mergeWith({}, state , newUsers, customizer);
    }
    case RECEIVE_POST: {
      let receiver = Object.assign({}, state[action.post.receiver_id])
      receiver.postIds = receiver.postIds.slice();
      if (!receiver.postIds.includes(action.post.id)){
        receiver.postIds.unshift(action.post.id);
      }
      return _.merge({}, state, { [receiver.id]: receiver})
    }
    case REMOVE_POST: {
      let receiver = Object.assign({}, state[action.post.receiver_id])
      receiver.postIds = action.receiver_posts.slice()
      const newState = _.mergeWith({}, state, { [receiver.id]: receiver}, customizer)
      return newState
    }
    case RECEIVE_CURRENT_USER: {
      if (action.user === null) {
        return {};
      }
    }
    default:
      return state;
  }
}

export default UsersReducer;
