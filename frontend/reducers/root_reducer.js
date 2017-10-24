import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import EntitiesReducer from './entities_reducer'

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer,
})

export default RootReducer;
