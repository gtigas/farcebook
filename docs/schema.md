# Database Schema


## users

| column name      | data type           | details  |
| ------------- |:-------------:| -----:|
|   id  | integer | not null, primary key |
| email | string | not null, indexed, unique |
| first_name | string| not null |
| last_name  | string | not null |
| password_digest | string | not null |
| session_token | string | not null, indexed, unique |
| birth_date | date | not null |
| gender | string |  not null |
| current_city | string | not null |
| profile_picture_url | string |  |
| cover_photo_url | string |    |  
| created_at | datetime | not null |
| updated_at | datetime | not null |


## friendships
| column name      | data type           | details  |
| ------------- |:-------------:| -----:|
| id | integer| not null, primary key |
| requester_id | integer | not null, foreign key (Users)|
| receiver_id | integer |  not null, foreign key (Users)|
| status | string | not null (i.e. 'pending'/'accepted') |
| created_at | datetime | not null |
| updated_at | datetime | not null |

## posts
| column name      | data type           | details  |
| ------------- |:-------------:| -----:|
|   id  |integer  | not null, primary key |
| body | string | not null |
| author_id | integer | not null, indexed, foreign key (Users)|
| receiver_id | integer | optional post on other users wall, foreign key (Users)|
| created_at | datetime | not null |
| updated_at | datetime | not null |


## comments
| column name      | data type           | details  |
| ------------- |:-------------:| -----:|
|   id  |integer  | not null, primary key |
| body | string | not null |
| post_id | integer | not null, indexed, foreign key (Posts)|
| author_id | integer | not null, indexed, foreign key (Users)|
| created_at | datetime | not null |
| updated_at | datetime | not null |

## likes
| column name      | data type           | details  |
| ------------- |:-------------:| -----:|
|   id  |integer  | not null, primary key |
| liker_id | integer | not null, foreign key (Users) |
| likeable_id | integer | not null, foreign_key, polymorphic |
| likeable_type | string | not null, foreign_key, polymorphic |
| created_at | datetime | not null |
| updated_at | datetime | not null |


## notifications
| column name      | data type           | details  |
| ------------- |:-------------:| -----:|
|   id  |integer  | not null, primary key |
| notifiee_id | integer | not null, foreign key (Users) |
| notifiable_id| integer | not null, foreign_key, polymorphic |
| notifiable_type | string | not null, foreign_key, polymorphic |
| created_at | datetime | not null |
| updated_at | datetime | not null |
