json.extract! user, :id, :email, :birth_date, :hometown, :current_city, :school, :workplace, :gender
json.firstName user.first_name
json.fullName [user.first_name.capitalize,user.last_name.capitalize].join(" ")
json.profile_picture_url user.profile_picture.url
json.cover_photo_url user.cover_photo.url
json.friend_ids user.friend_ids
json.postIds user.wall_posts.order(updated_at: :desc).map(&:id)
json.unreadNotifications user.notifications.where(status: 'UNREAD').count
json.feedIds Post.where(receiver_id: user.id)
          .or(Post.where('(author_id IN (?)) AND (receiver_id != ?)', ([user.id]+user.friend_ids), user.id))
          .order(updated_at: :desc)
          .limit(10)
          .distinct
          .map(&:id)
