json.extract! @user, :id, :email, :birth_date, :hometown, :current_city, :school, :workplace, :gender
json.firstName @user.first_name
json.fullName [@user.first_name.capitalize,@user.last_name.capitalize].join(" ")
json.profile_picture_url @user.profile_picture.url
json.cover_photo_url @user.cover_photo.url
json.friend_ids @user.friend_ids
json.postIds @user.wall_posts.order(updated_at: :desc).map(&:id)
json.feedIds @feed || []
