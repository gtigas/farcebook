import React from 'react';
import ProfileHeader from './profile_header';
import ProfileAboutList from './profile-about-side';
import ProfileFriendsList from './profile_friends';
import PostForm from './profile_post_form';
import PostShow from '../feed/post_show'
import FriendsPage from './friends_page'
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';
import { fetchPosts, fetchFeed } from '../../actions/posts_actions'
import { requestPending } from '../../util/profile_util'
import { sendFriendRequest } from '../../actions/friends_actions'
import { Route, Switch } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';



class ProfileMain extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if (!this.props.isCurrentUser || this.props.notFriends) {
      this.props.fetchPosts(parseInt(this.props.match.params.userId));
    }
    if (!this.props.user.birth_date){
      this.props.fetchUser(this.props.match.params.userId)
    }
  }

  componentWillReceiveProps(newProps){
    if (this.props.loading) return;
    const userId = newProps.match.params.userId
    if (this.props.user.id !== parseInt(userId)) {
      this.props.fetchUser(userId);
      document.getElementsByClassName('scroll-container')[0].scrollTop=0
    }
  }


  render(){
    const { notFriends, loading, addFriend, friends,
            isCurrentUser, user, requestPending, fetchUser,
            match, postIds } = this.props;

    const postList = postIds.map( id => {
      return (
        <PostShow key={id} postId={id}
                          areFriends={!notFriends}
                          isCurrentUser={isCurrentUser}
                          profileId={user.id}/>
      )
    });
    return (
      <div id='main-container' className='scroll-container'>
        <ProfileHeader userId={match.params.userId}
                       fetchUser={fetchUser}
        />
        { !loading && notFriends && !isCurrentUser &&
          <div className='not-friends'>
            <span>DO YOU KNOW {user.firstName.toUpperCase()}</span>
            <div className='flex-row'>
              <p>To post on their wall or comment on their posts,
                  send them a friend request!</p>
              {requestPending ? null :
                <button id='already-friends'
                        className='hover'
                        onClick={addFriend(user.id)}>
                  Add Friend
                </button> }
            </div>
          </div>
        }
        <Switch>
          <Route path='/users/:userId/friends' component={FriendsPage} />
          <Route path='/users/:userId' render={ () =>
             !loading ? (
              <main className='profile-body'>
                <aside>
                  <ProfileAboutList userId={user.id}/>
                  <ProfileFriendsList friends={friends}/>
                </aside>
                <section className='flex-col profile-feed'>
                  <PostForm isWallPost={isCurrentUser ? false : true}
                            receiver={user} />
                  {postList}
                </section>
              </main> ) : (
              <div className='loading'>
                <ScaleLoader color='#93949b'  />
              </div>
           )}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId] || { friend_ids:[], postIds:[]}
  const friends = user.friend_ids.map( id => state.entities.users[id])
  const postIds = user.postIds
  return ({
    user,
    friends,
    postIds,
    loading: state.ui.loading,
    isCurrentUser: state.session.currentUser.id === parseInt(ownProps.match.params.userId),
    notFriends: !user.friend_ids.includes(state.session.currentUser.id),
    requestPending: requestPending(state, user.id),
  })
};

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: userId => dispatch(fetchPosts(userId)),
  addFriend: userId => () => dispatch(sendFriendRequest(userId)),
  fetchFeed: (userId) => dispatch(fetchFeed(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
