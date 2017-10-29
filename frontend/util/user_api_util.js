export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/users',
  })
}
export const fetchUser = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${userId}`,
  })
}
export const updateUser  = (user) => {
  if (user.id) {
    return $.ajax({
      method: 'PATCH',
      url: `api/users/${user.id}`,
      data: { user: user.user }
    })
  } else {
    return $.ajax({
      method: 'PATCH',
      url: `api/users/${user.get('user[id]')}`,
      processData: false,
      contentType: false,
      dataType: 'json',
      data: user,
    })
  }
}
