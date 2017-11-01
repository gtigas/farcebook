json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
  json.set! @current_user.id do
    json.extract! @current_user, :id, :email, :birth_date, :hometown, :current_city, :school, :workplace, :gender
    json.firstName @current_user.first_name
    json.fullName [@current_user.first_name.capitalize,@current_user.last_name.capitalize].join(" ")
    json.profile_picture_url @current_user.profile_picture.url
    json.cover_photo_url @current_user.cover_photo.url
    json.friend_ids @current_user.friend_ids
    json.postIds @current_user.wall_posts.order(updated_at: :desc).map(&:id)
  end
end

json.notifications(@notifications) do |notification|
  json.partial! 'api/notifications/notification', notification: notification
end


json.posts do
  @posts.each do |post|
    json.set! post.id do
      json.partial! 'api/posts/post', post: post, current_user: @current_user
    end
  end
end

json.comments do
  @comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment, current_user: @current_user
    end
  end
end
