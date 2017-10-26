import _ from 'lodash';
import { RECEIVE_REQUESTS,
        SEND_REQUEST,
        REMOVE_REQUEST } from '../actions/friends_actions'


const FriendsReducer = (state = { received: {}, sent: []}, action) => {
  switch (action.type) {
    case RECEIVE_REQUESTS: {
      const received = _.merge({}, state.received, action.received);
      const sent = state.sent.concat(action.sent);
      return { received, sent }
    }
    case SEND_REQUEST: {
      const sent = state.sent.concat(action.request.receiver);
      return _.merge({}, state, { sent } )
    }
    case REMOVE_REQUEST: {
      const newState = _.merge({}, state)
      delete newState.received[action.request.id]
      return newState
    }
    default:
      return state
  }
};

export default FriendsReducer
