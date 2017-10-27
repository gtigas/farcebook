json.post do
  json.partial! 'api/posts/post', post: @post
end

json.receiver_posts @post.receiver.wall_posts.order(updated_at: :desc).map(&:id)
