json.extract! post, :id, :body, :author_id, :receiver_id,
                    :updated_at, :comment_ids

json.liker_ids post.liker_ids
