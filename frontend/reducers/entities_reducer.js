import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import FriendsReducer from './friends_reducer';
import PostsReducer from './posts_reducer';
import CommentsReducer from './comments_reducer'

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  friendRequests: FriendsReducer,
  posts: PostsReducer,
  commments: CommentsReducer,
});

export default EntitiesReducer;
