import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comments_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/likes_actions'
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_POSTS, RECEIVE_FEED, RECEIVE_POST } from '../actions/posts_actions'
import { customizer } from '../util/action_util'

const CommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENT: {
      let newState = {};
      if (action.comment.parent_comment_id) {
        const parentComment = Object.assign({}, state[action.comment.parent_comment_id])
        parentComment.child_comment_ids = parentComment.child_comment_ids.slice();
        parentComment.child_comment_ids.push(action.comment.id)
        newState[parentComment.id] = parentComment
      }
      newState[action.comment.id] = action.comment
      return _.merge({}, state, newState)
    }
    case RECEIVE_FEED: {
      return _.merge({}, state, action.comments )
    }
    case RECEIVE_POST: {
      return _.merge({}, state, action.comments )
    }
    case RECEIVE_USER: {
      return _.merge({}, state, action.comments )
    }
    case REMOVE_COMMENT: {
      const newState = _.merge({}, state)
      delete newState[action.comment.id]
      if (action.comment.parent_comment_id) {
        const parentComment = newState[action.comment.parent_comment_id]
        parentComment.child_comment_ids.splice(parentComment.child_comment_ids.indexOf(action.comment.id), 1)
        return _.mergeWith({}, newState, { [parentComment.id]: parentComment}, customizer)
      }
      return newState
    }
    case RECEIVE_POSTS: {
      return _.merge({}, state, action.comments)
    }
    case RECEIVE_LIKE: {
      if (action.likeType === 'comment') {
        let comment = Object.assign({}, state[action.id])
        comment.currentUserLikes = true;
        comment.liker_ids = action.likers.slice();
        return _.mergeWith({}, state, { [comment.id]: comment}, customizer )
      } else {
        return state;
      }
    }
    case REMOVE_LIKE: {
      if (action.likeType === 'comment') {
        let comment = Object.assign({}, state[action.id])
        comment.currentUserLikes = false;
        comment.liker_ids = action.likers.slice();
        return _.mergeWith({}, state, { [comment.id]: comment}, customizer )
      } else {
        return state;
      }
    }
    case RECEIVE_CURRENT_USER: {
      if (action.user === null) {
        return {};
      }
    }
    default: return state
  }
}

export default CommentsReducer;
