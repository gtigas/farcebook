export const like = (type, id) => {
  return $.ajax({
    method: 'POST',
    url: `api/${type}/${id}/like`
  })
}

export const unlike = (type, id) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/${type}/${id}/unlike`
  })
}

// export const likePost = post => {
//   return $.ajax({
//     method: 'POST',
//     url: `api/posts/${post.id}/like`
//   })
// }

//
// export const unlikePost = post => {
//   return $.ajax({
//     method: 'DELETE',
//     url: `api/posts/${post.id}/unlike`
//   })
// }
