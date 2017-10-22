# Sample State

```js
{
  entities: {
    posts: {
      1: {
        id: 1,
        body: 'What a day',
        author_id: 14,
        likes: 1,
        comment_ids: [2],
        liked_by_user_ids: [7],
        current_user_likes: false
      },
      2: {
        id: 2,
        body: "I love JavaScript!",
        author_id: 14,
        likes: 0,
        liked_by_user_ids: [],
        comment_ids: [4],
        current_user_likes: true
      },
      3: {
        id: 3,
        body: "i am very hungry rn",
        author_id: 7,
        likes: 0,
        liked_by_user_ids: [],
        comment_ids: [1,3],
        current_user_likes: true
      }

    },
    users: {
      4: {
        id: 4,
        full_name: 'John Smith',
        img_url: "https://cdn.pixabay.com/photo/2013/11/03/14/56/bird-204842_960_720.jpg"
      },

      7: {
        id: 7,
        full_name: 'Glenn Tigas',
        img_url: "https://cdn.pixabay.com/photo/2013/11/03/14/56/bird-204842_960_720.jpg"
      },

      14: {
        id: 14,
        full_name: 'Mickey Mouse',
        img_url: "https://cdn.pixabay.com/photo/2013/11/03/14/56/bird-204842_960_720.jpg"
      }

    },
    comments: {
      1: {
        id: 1,
        author_id: 4,
        post_id: 3,
        body: 'Wow really? Cool Story'
      },
      2: {
        id: 2,
        author_id: 7,
        post_id: 1,
        body: 'I agree!'  
      },
      3: {
        id: 3,
        author_id: 14,
        post_id: 3,
        body: "Thats so sad!"
      },
      4: {
        id: 4,
        author_id: 4,
        post_id: 2,
        body: "I don't! :( "
      }

    },
    notifications: {
      1: {
        id: 1,
        post_id: 3,
        notifiee_id: 7,
        notification_type: 'Comment'
      },
      2: {
        id: 2,
        post_id: 1,
        notifiee_id: 14,
        notification_type: 'Like'
      },
      3: {
        id: 3,
        post_id: null,
        notifiee_id: 4,
        notification_type: 'FriendReq'
      }
    },
    friend_requests: {
      1: {
        id: 1,
        requester_id: 3
      },
      2: {
        id: 2,
        request_id 7
      },
      3: {
        id: 3,
        requester_id 10
      }
    }
  },
  ui: {
    modals: [],
    dropdowns: [],
  },
  errors: {
    login: ["Incorrect username/password combination"],
    postForm: ["Post body cannot be blank"],
  },
  session: {
    currentUser: {    
      id: 87,
      full_name: "Donald Duck",
      friend_ids: [1,6,18,22,47],
      friend_request_ids: [2,8,12],
      img_url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Donald_Duck.svg/618px-Donald_Duck.svg.png"
    }
  }
}
```
