liker_ids = comment.likes.map(&:liker_id)

json.extract! comment, :id, :body, :author_id, :post_id, :updated_at
json.liker_ids liker_ids
json.current_user_likes liker_ids.include?(current_user.id)
