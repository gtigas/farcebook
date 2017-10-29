import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comments_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_POSTS } from '../actions/posts_actions'

const CommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENT: {
      return _.merge({}, state, { [action.comment.id]: action.comment })
    }
    case REMOVE_COMMENT: {
      const newState = _.merge({}, state)
      delete newState[action.comment.id]
      return newState
    }
    case RECEIVE_POSTS: {
      return _.merge({}, state, action.comments)
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
