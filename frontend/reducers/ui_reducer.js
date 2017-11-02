import { combineReducers } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/ui_actions';
import { RECEIVE_USERS } from '../actions/user_actions'
import { RECEIVE_POSTS, RECEIVE_FEED } from '../actions/posts_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRENDS } from '../actions/trending_actions';
import _ from 'lodash';


const defaultState = { modal: {},
                      loading: true,
                      feedLoading:true,
                      trendLoading:true }

const UIReducer = (state = defaultState, action ) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return _.merge ({}, state, { modal: { [action.modalType]: true} })
    }
    case CLOSE_MODAL: {
      const newState = _.merge({}, state)
      delete newState.modal[action.modalType]
      return newState
    }
    case RECEIVE_USERS: {
      const newState = _.merge({}, state)
      newState.loading = false;
      return newState
    }
    case RECEIVE_TRENDS: {
      const newState = _.merge({}, state)
      newState.trendLoading = false;
      return newState
    }
    case RECEIVE_FEED: {
      const newState = _.merge({}, state)
      newState.loading = false;
      return newState
    }
    case RECEIVE_POSTS: {
      const newState = _.merge({}, state)
      newState.loading = false;
      return newState
    }
    case RECEIVE_CURRENT_USER: {
      const newState = _.merge({}, state)
      newState.feedLoading = false;
      if (action.user === null) {
        newState.loading = true;
        newState.feedLoading = true;
      }
      return newState
    }
    default:
      return state
  }
}
export default UIReducer;
