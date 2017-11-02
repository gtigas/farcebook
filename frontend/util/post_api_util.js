export const fetchFeed = (userId) => {
  const data = userId ? { userId } : null
  return $.ajax({
    method: 'GET',
    url: 'api/feed',
    data
  })
}

export const fetchPosts = (user_id) => {
  return $.ajax({
    method: 'GET',
    url: 'api/posts',
    data: { user_id }
  })
}

export const fetchPost = postId => {
  return $.ajax({
    method: 'GET',
    url: `api/posts/${postId}`,
  })
}

export const createPost = post => {
  return $.ajax({
    method: 'POST',
    url: 'api/posts',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: post, 
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
