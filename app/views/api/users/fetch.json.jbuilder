json.user do
  json.extract! @user, :id, :email, :birth_date, :hometown, :current_city, :school, :workplace, :gender
  json.firstName @user.first_name
  json.fullName [@user.first_name.capitalize,@user.last_name.capitalize].join(" ")
  json.profile_picture_url @user.profile_picture.url
  json.cover_photo_url @user.cover_photo.url
  json.friend_ids @user.friend_ids
  json.postIds @user.wall_posts.order(updated_at: :desc).map(&:id)
end

json.posts do
  @posts.each do |post|
    json.set! post.id do
      json.partial! 'api/posts/post', post: post
    end
  end
end

json.comments do
  @comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
