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
    case 'object' : {
      if (notification.sourceItemType === 'Post') {
        return ' commented on your post.'
      } else if (notifiction.sourceItemType === 'Comment') {
        return ' commented on your comment'
      }
    }
  }
}
