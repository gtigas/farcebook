# Routes

## Frontend Routes
* `/` - landing, login/sign up
* `/feed` - homepage, friends feed
* `/users/:id` user profile, user feed
* `/users/:id/about` user profile info
* `/users/:id/friends` friends list
* `/posts/:id` post show


---

## API Endpoints

### users
+ `GET /api/users` - returns users based on filters given
+ `GET /api/users/:id` - returns all users information (relevant to user id)
+ `POST /api/users` - sign up new user
+ `PATCH /api/users/:id` - edit profile information

### users
+ `POST /api/session` - login a user
+ `DELETE /api/session` - logout a user

### friendships
+ `GET /api/friendships` - returns current users friend requests
+ `POST /api/users/:id/add_friend` - add a new friend request
+ `PATCH /api/friendships/:id` - accept friend request
+ `DELETE /api/friendships/:id` - delete friend/friend request

### posts
+ `GET /api/posts` - returns relevant posts (includes comments)
+ `GET /api/posts/:id` - returns post
+ `POST /api/posts` - creates a post
+ `PATCH /api/posts/:id` - edit a post
+ `DELETE /api/posts/:id` - remove a post

### comments
+ `POST /api/comments` - create a comment
+ `PATCH /api/comments/:id` - edit a comment
+ `DELETE /api/comments/:id` - remove a comment

### likes
+ `POST /api/posts/:id/like` - like a post
+ `DELETE /api/posts/:id/like` - unlike a post
+ `POST /api/comments/:id/like` - like a comment
+ `DELETE /api/comments/:id/like` - unlike a comment

### notifications
+ `GET /api/notifications` - returns current users notifications (both read/unread)
+ `PATCH /api/notifications/:id` - read/update notification
