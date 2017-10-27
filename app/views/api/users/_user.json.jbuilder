json.id user.id
json.profile_picture_url user.profile_picture.url
json.fullName [user.first_name.capitalize,user.last_name.capitalize].join(" ")
json.firstName user.first_name
json.friend_ids user.friend_ids
json.postIds user.wall_posts.order(updated_at: :desc).map(&:id)
