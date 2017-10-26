import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import FriendsReducer from './friends_reducer';
import PostsReducer from './posts_reducer';

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  friendRequests: FriendsReducer,
  posts: PostsReducer,
});

export default EntitiesReducer;
