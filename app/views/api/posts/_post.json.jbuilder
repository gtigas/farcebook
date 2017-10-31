liker_ids = post.likes.map(&:liker_id)


json.extract! post, :id, :body, :author_id, :receiver_id,
                    :updated_at, :comment_ids

json.liker_ids liker_ids
json.currentUserLikes liker_ids.include?(current_user.id)
