liker_ids = comment.likes.map(&:liker_id)

json.extract! comment, :id, :body, :author_id, :post_id,
                        :updated_at, :parent_comment_id
json.liker_ids liker_ids
json.child_comment_ids comment.child_comment_ids
json.currentUserLikes liker_ids.include?(current_user.id)
