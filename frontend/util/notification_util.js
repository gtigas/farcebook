export const createNotificationText = (notification) => {
  if (notification.likeNotification) {
    switch (notification.sourceItemType) {
      case "Post": {
        return " likes your post."
      }
      case "Comment": {
        return " likes your comment."
      }
    }
  }
  switch (typeof notification.item) {
    case 'string': {
      if (notification.item === 'Wall Post') {
        return " posted on your wall."
      } else if (notification.item === 'Friend Request') {
        return " has sent you a friend request."
      }
    }
    default : {
      if (notification.sourceItemType === 'Post' || notification.topLevelComment) {
        return ' commented on your post.'
      } else if (notification.sourceItemType === 'Comment') {
        return ' commented on your comment'
      }
    }
  }
}

export const parseNotifications = (notifications, state) => {
  return notifications.slice(0,6).map( notification => {
    let { notifierId, likeNotification,
          sourceItemId, sourceItemType } = notification
    notification.author = {
      fullName: state.entities.users[notifierId].fullName,
      profilePic: state.entities.users[notifierId].profile_picture_url
    }
    if (sourceItemType === 'Comment' && !likeNotification) {
      notification.item = state.entities.posts[sourceItemId]
    } else if (sourceItemType === 'Comment' && likeNotification) {
      notification.item = state.entities.comments[sourceItemId]
    } else if (sourceItemType === 'Post' && !likeNotification) {
      notification.item = "Wall Post"
    } else if (sourceItemType === 'Post' && likeNotification) {
      notification.item = state.entities.posts[sourceItemId]
    } else if (sourceItemType === 'User') {
      notification.item = "Friend Request"
    }
    return notification
    }
  )
}

export const notificationItemLink = notification => {
  if (notification.likeNotification) {
    switch (notification.sourceItemType) {
      case "Post": {
        return `/posts/${notification.sourceItemId}`
      }
      case "Comment": {
        return `/posts/${notification.sourceItemId}`
      }
    }
  }
  switch (typeof notification.item) {
    case 'string': {
      if (notification.item === 'Wall Post') {
        return `/posts/${notification.sourceItemId}`
      } else if (notification.item === 'Friend Request') {
        return "/#"
      }
    }
    default : return `/posts/${notification.sourceItemId}`
  }
}
