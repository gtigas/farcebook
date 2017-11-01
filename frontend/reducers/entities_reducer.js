import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import FriendsReducer from './friends_reducer';
import PostsReducer from './posts_reducer';
import CommentsReducer from './comments_reducer'
import TrendsReducer from './trending_reducer'
import NotificationsReducer from './notifications_reducer'

const EntitiesReducer = combineReducers({
  users: UsersReducer,
  friendRequests: FriendsReducer,
  posts: PostsReducer,
  comments: CommentsReducer,
  trends: TrendsReducer,
  notifications: NotificationsReducer
});

export default EntitiesReducer;
