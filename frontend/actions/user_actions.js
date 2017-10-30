import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_FEED = 'RECEIVE_FEED';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveUser = ({ user, posts, comments }) => ({
  type: RECEIVE_USER,
  user,
  posts,
  comments
});

const receiveUpdatedUser = (user) => ({
  type: RECEIVE_USER,
  user
})

export const fetchFeed = () => dispatch => {
  return UserAPIUtil.fetchFeed().then(
    payload => dispatch(receiveFeed(payload))
  )
}

export const fetchUsers = () => dispatch => {
  return UserAPIUtil.fetchUsers().then(
    users => dispatch(receiveUsers(users)),
    errors => dispatch(receiveErrors(errors, 'users'))
  )
}

export const fetchUser = userId => dispatch => {
  return UserAPIUtil.fetchUser(userId).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors, 'users'))
  )
}

export const updateUser = user => dispatch => {
  return UserAPIUtil.updateUser(user).then(
    user => dispatch(receiveUpdatedUser(user)),
    errors => dispatch(receiveErrors(errors, 'users'))
  )
}
