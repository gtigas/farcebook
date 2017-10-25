import { OPEN_MODAL, CLOSE_MODAL } from '../actions/ui_actions';
import _ from 'lodash';

const ModalReducer = (state = {}, action) =>{
  switch (action.type) {
    case OPEN_MODAL: {
      return _.merge ({}, state, { [action.modalType]: true} )
    }
    case CLOSE_MODAL: {
      const newState = _.merge({}, state)
      delete newState[action.modalType]
      return newState
    }
    default:
      return state
  }
};

export default ModalReducer
