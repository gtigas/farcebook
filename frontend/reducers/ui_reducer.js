import { combineReducers } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/ui_actions';
import { RECEIVE_USERS } from '../actions/user_actions'
import _ from 'lodash';


const defaultState = { modal: {}, loading: true }

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
    default:
      return state
  }
}
export default UIReducer;
