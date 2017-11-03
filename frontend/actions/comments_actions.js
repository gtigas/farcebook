import * as CommentAPIUtil from '../util/comment_api_util';
import { receiveErrors } from './session_actions';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

const removeComment = comment =>({
  type: REMOVE_COMMENT,
  comment
})

export const createComment = comment => dispatch => {
  return CommentAPIUtil.createComment(comment).then(
    comment => dispatch(receiveComment(comment)),
    errors => dispatch(receiveErrors(errors, 'comments'))
  )
}

export const updateComment = comment => dispatch => {
  return CommentAPIUtil.updateComment(comment).then(
    comment => dispatch(receiveComment(comment)),
    errors => dispatch(receiveErrors(errors, 'comments'))
  )
}

export const deleteComment = commentId => dispatch => {
  return CommentAPIUtil.deleteComment(commentId).then(
    comment => dispatch(removeComment(comment))
  )
}
