import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/posts_actions'
import _ from 'lodash'

const PostsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS: {
      return action.posts;
    }
    case RECEIVE_POST: {
      return _.merge(state, { [action.post.id]: action.post })
    }
    case REMOVE_POST: {
      const newState = _.merge({}, state);
      delete newState[action.post.id]
      return newState;
    }
    default:
      return state
  }
}

export default PostsReducer;
