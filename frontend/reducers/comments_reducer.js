import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comments_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/likes_actions'
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_POSTS, RECEIVE_FEED } from '../actions/posts_actions'

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return srcValue;
  } else if (_.isBoolean(objValue))
    return srcValue;
}


const CommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENT: {
      return _.merge({}, state, { [action.comment.id]: action.comment })
    }
    case RECEIVE_FEED: {
      return _.merge({}, state, action.comments )
    }
    case RECEIVE_USER: {
      return _.merge({}, state, action.comments )
    }
    case REMOVE_COMMENT: {
      const newState = _.merge({}, state)
      delete newState[action.comment.id]
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
