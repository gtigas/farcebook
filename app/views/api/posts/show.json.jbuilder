json.post do
  json.partial! 'api/posts/post', post: @post
end

json.comments do
  @comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment, current_user: @current_user
    end
  end
end
