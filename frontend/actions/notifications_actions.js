import * as NotificationAPI from '../util/notification_api_util'

export const READ_NOTIFICATION = 'READ_NOTIFICATION';

const updateNotification = notification => ({
  type: READ_NOTIFICATION,
  notification
})

export const readNotification = notification => dispatch => {
  return NotificationAPI.readNotification(notification).then(
    notification => dispatch(updateNotification(notification))
  )
}
