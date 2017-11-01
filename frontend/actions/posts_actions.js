import * as PostAPIUtil from '../util/post_api_util';
import { receiveErrors } from './session_actions'

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_FEED = 'RECEIVE_FEED';

const receivePosts = ({ users, posts, comments, notifications }) => {
  return ({
    type: RECEIVE_FEED,
    users,
    posts,
    comments,
    notifications
  })
}

const receiveFeed = ({ users, posts, comments, notifications }) => {
  return {
    type: RECEIVE_FEED,
    users,
    posts,
    comments,
    notifications,
  }
}

const receivePost = payload => ({
  type:RECEIVE_POST,
  post: payload.post,
  comments: payload.comments
})

const removePost = payload => ({
  type:REMOVE_POST,
  post: payload.post,
  receiver_posts: payload.receiver_posts,
});

export const fetchFeed = (userId) => dispatch => {
  return PostAPIUtil.fetchFeed(userId).then(
    payload => dispatch(receiveFeed(payload)),
    errors => dispatch(receiveErrors(errors, 'posts'))
  )
}

export const fetchPosts = (userId) => dispatch => {
  return PostAPIUtil.fetchPosts(userId).then(
    payload => dispatch(receivePosts(payload)),
    errors => dispatch(receiveErrors(errors, 'posts'))
  )
}

export const fetchPost = postId => dispatch => {
  return PostAPIUtil.fetchPost(postId).then(
    post => dispatch(receivePost(post)),
    errors => dispatch(receiveErrors(errors, 'posts'))
  )
}

export const createPost = post => dispatch => {
  return PostAPIUtil.createPost(post).then(
    post => dispatch(receivePost(post)),
    errors => dispatch(receiveErrors(errors, 'posts'))
  )
}

export const updatePost = post => dispatch => {
  return PostAPIUtil.updatePost(post).then(
    post => dispatch(receivePost(post)),
    errors => dispatch(receiveErrors(errors, 'posts'))
  )
}

export const deletePost = postId => dispatch => {
  return PostAPIUtil.deletePost(postId).then(
    post => dispatch(removePost(post)),
    errors => dispatch(receiveErrors(errors, 'posts'))
  )
}
