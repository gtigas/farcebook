import * as PostAPIUtil from '../util/post_api_util';
import { receiveErrors } from './session_actions'

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';

const receivePosts = payload => {
  return ({
    type: RECEIVE_POSTS,
    posts: payload.posts,
    comments: payload.comments,
  })
}

const receivePost = payload => ({
  type:RECEIVE_POST,
  post: payload.post
})

const removePost = payload => ({
  type:REMOVE_POST,
  post: payload.post,
  receiver_posts: payload.receiver_posts,
});

export const fetchPosts = (userId) => dispatch => {
  return PostAPIUtil.fetchPosts(userId).then(
    payload => dispatch(receivePosts(payload)),
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
