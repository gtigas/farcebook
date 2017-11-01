import { RECEIVE_FEED } from '../actions/posts_actions'
import { READ_NOTIFICATION } from '../actions/notifications_actions'
import { customizer } from '../util/action_util'
import _ from 'lodash'

const NotificationsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FEED: {
      return action.notifications
    }
    case READ_NOTIFICATION: {
      const notifIndex = state.findIndex( notif => notif.id === action.notification.id)
      let newState = state.slice();
      newState[notifIndex] = action.notification
      return newState
    }
    default: return state;

  }
}

export default NotificationsReducer;
