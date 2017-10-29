export const fetchFeed = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/feed'
  })
}

export const fetchPosts = (user_id) => {
  return $.ajax({
    method: 'GET',
    url: 'api/posts',
    data: { user_id }
  })
}

export const createPost = post => {
  return $.ajax({
    method: 'POST',
    url: 'api/posts',
    data: { post }
  })
}

export const updatePost = post => {
  return $.ajax({
    method: 'PATCH',
    url: `api/posts/${post.id}`,
    data: { post }
  })
}

export const deletePost = postId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/posts/${postId}`
  })
}
