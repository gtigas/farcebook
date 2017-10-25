import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const fetchUsers = () => dispatch => {
  return UserAPIUtil.fetchUsers().then(
    users => dispatch(receiveUsers(users))
  )
}

export const fetchUser = userId => dispatch => {
  return UserAPIUtil.fetchUser(userId).then(
    user => dispatch(receiveUser(user))
  )
}

export const updateUser = user => dispatch => {
  return UserAPIUtil.updateUser(user).then(
    user => dispatch(receiveUser(user))
  )
}
