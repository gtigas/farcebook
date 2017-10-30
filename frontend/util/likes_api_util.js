export const likeComment = (comment) => {
  return $.ajax({
    method: 'POST',
    url: `api/comments/${comment.id}/like`
  })
}

export const likePost = post => {
  return $.ajax({
    method: 'POST',
    url: `api/posts/${post.id}/like`
  })
}

export const unlikeComment = comment => {
  return $.ajax({
    method: 'DELETE',
    url: `api/comments/${comment.id}/unlike`
  })
}

export const unlikePost = post => {
  return $.ajax({
    method: 'DELETE',
    url: `api/posts/${post.id}/unlike`
  })
}
