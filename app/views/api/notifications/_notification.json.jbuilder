case notification.notifiable_type
when 'Like'
  sourceItemId = notification.notifiable.likable.id
  sourceItemType = notification.notifiable.likable_type
  likeNotification = true
when 'Comment'
  sourceItemId = notification.notifiable_id
  sourceItemType = notification.notifiable_type
  likeNotification = false
when 'Friendship'
  sourceItemId = notification.notifiable.requester_id
  sourceItemType = 'User'
  likeNotification = false
when 'Post'
  sourceItemId = notification.notifiable_id
  sourceItemType = notification.notifiable_type
  likeNotification = false
end

json.extract! notification, :id, :created_at
json.sourceItemId sourceItemId
json.sourceItemType sourceItemType
json.likeNotification likeNotification
