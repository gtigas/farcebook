import { RECEIVE_FEED } from '../actions/posts_actions'
import { READ_NOTIFICATION } from '../actions/notifications_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { customizer } from '../util/action_util'
import _ from 'lodash'

const NotificationsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FEED: {
      if (action.notifications) {
        return action.notifications
      } else {
        return state;
      }
    }
    case READ_NOTIFICATION: {
      const notifIndex = state.findIndex( notif => notif.id === action.notification.id)
      let newState = state.slice();
      newState[notifIndex] = action.notification
      return newState
    }
    case RECEIVE_CURRENT_USER: {
      if (action.user === null) {
        return [];
      }
    }
    default: return state;

  }
}

export default NotificationsReducer;
