import { RECEIVE_POSTS, RECEIVE_POST,
        REMOVE_POST, RECEIVE_FEED } from '../actions/posts_actions'
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comments_actions'
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/likes_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { customizer } from '../util/action_util'
import _ from 'lodash'


const PostsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS: {
      return action.posts;
    }
    case RECEIVE_FEED: {
      return _.merge({}, state, action.posts )
    }
    case RECEIVE_POST: {
      return _.merge({}, state, { [action.post.id]: action.post })
    }
    case RECEIVE_USER: {
      return _.merge({}, state, action.posts )
    }
    case REMOVE_POST: {
      const newState = _.merge({}, state);
      delete newState[action.post.id]
      return newState;
    }
    case RECEIVE_COMMENT: {
      let post = Object.assign({}, state[action.comment.post_id])
      post.comment_ids = post.comment_ids.slice()
      post.comment_ids.push(action.comment.id)
      return _.merge({}, state, { [post.id]: post})
    }
    case REMOVE_COMMENT: {
      let post = Object.assign({}, state[action.comment.post_id])
      post.comment_ids = post.comment_ids.slice()
      post.comment_ids.splice(post.comment_ids.indexOf(action.comment.id), 1)
      const newState = _.mergeWith({}, state, { [post.id]: post}, customizer)
      return newState
    }
    case RECEIVE_LIKE: {
      if (action.likeType === 'post') {
        let post = Object.assign({}, state[action.id])
        post.currentUserLikes = true;
        post.liker_ids = action.likers.slice();
        return _.mergeWith({}, state, { [post.id]: post}, customizer )
      } else {
        return state;
      }
    }
    case REMOVE_LIKE: {
      if (action.likeType === 'post') {
        let post = Object.assign({}, state[action.id])
        post.currentUserLikes = false;
        post.liker_ids = action.likers.slice();
        return _.mergeWith({}, state, { [post.id]: post}, customizer )
      } else {
        return state;
      }
    }
    case RECEIVE_CURRENT_USER: {
      if (action.user === null) {
        return {};
      }
    }
    default:
      return state
  }
}



export default PostsReducer;
