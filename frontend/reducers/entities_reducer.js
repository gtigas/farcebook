import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import FriendsReducer from './friends_reducer'

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  friendRequests: FriendsReducer,
});

export default EntitiesReducer;
