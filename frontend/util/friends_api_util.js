export const fetchFriends = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/friends'
  })
};

export const fetchFriendRequests = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/friend-requests'
  });
};

export const sendFriendRequest = (userId) => {
  return $.ajax({
    method: 'POST',
    url: `api/users/${userId}/add_friend`
  })
}

export const acceptFriendRequest = (userId) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/users/${userId}/accept_request`
  })
}
export const deleteFriendRequest = (userId) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/users/${userId}/reject_request`
  })
}
