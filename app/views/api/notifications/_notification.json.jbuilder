case notification.notifiable_type
when 'Like'
  sourceItemId = notification.notifiable.likable.id
  sourceItemType = notification.notifiable.likable_type
  notifierId = notification.notifiable.liker_id
  likeNotification = true
when 'Comment'
  sourceItemId = notification.notifiable.post.id
  sourceItemType = notification.notifiable_type
  notifierId = notification.notifiable.author_id
  likeNotification = false
when 'Friendship'
  sourceItemId = notification.notifiable.requester_id
  notifierId = sourceItemId
  sourceItemType = 'User'
  likeNotification = false
when 'Post'
  sourceItemId = notification.notifiable_id
  sourceItemType = notification.notifiable_type
  notifierId = notification.notifiable.author_id
  likeNotification = false
end

json.extract! notification, :id, :created_at
json.sourceItemId sourceItemId
json.sourceItemType sourceItemType
json.notifierId notifierId
json.likeNotification likeNotification
json.unread notification.status == 'UNREAD'
