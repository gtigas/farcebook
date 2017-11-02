case notification.notifiable_type
when 'Like'
  sourceItemType = notification.notifiable.likable_type
  if sourceItemType == 'Comment'
    sourceItemId = notification.notifiable.likable.post.id
  else
    sourceItemId = notification.notifiable.likable.id
  end
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
