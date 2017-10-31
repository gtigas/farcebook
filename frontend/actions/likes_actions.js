import * as LikeAPIUtil from '../util/likes_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

const receiveLike = ({ likeType, id, likers }) => ({
  type: RECEIVE_LIKE,
  likeType,
  id,
  likers,
})

const removeLike = ({ likeType, id, likers }) => ({
  type: REMOVE_LIKE,
  likeType,
  id,
  likers,
})

export const like = (type, id) => dispatch => {
  return LikeAPIUtil.like(type, id).then(
    payload => dispatch(receiveLike(payload))
  )
}

export const unlike = (type, id) => dispatch => {
  return LikeAPIUtil.unlike(type, id).then(
    payload => dispatch(removeLike(payload))
  )
}
