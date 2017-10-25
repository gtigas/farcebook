import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';

const UIReducer = combineReducers({
  modal: ModalReducer
})

export default UIReducer;
