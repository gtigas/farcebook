import React from 'react';
import ProfileHeader from './profile_header';
import ProfileAboutList from './profile-about-side';
import ProfileFriendsList from './profile_friends';
import PostForm from './profile_post_form';
import PostShow from '../feed/post_show'
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions'

class ProfileMain extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const userId = this.props.match.params.userId
    if (!this.props.user.id) {
      this.props.fetchUser(userId)
      this.props.fetchUsers();
    } else if (!this.props.user.birth_date){
      this.props.fetchUser(userId)
    }
    this.props.fetchPosts(userId);
  }

  componentWillReceiveProps(newProps){
    const userId = newProps.match.params.userId
    if (this.props.user.id !== parseInt(userId)) {
      this.props.fetchUser(userId);
      this.props.fetchPosts(userId);

    }
  }

  render(){
    const postList = this.props.postIds.map( id => {
      return (
        <PostShow key={id} postId={id} />
      )
    });
    return (
      <div>
        <ProfileHeader userId={this.props.match.params.userId}
                      fetchUser={this.props.fetchUser}/>

        {!this.props.loading ?
          <main className='profile-body'>
            <aside>
              <ProfileAboutList userId={this.props.user.id}/>
              <ProfileFriendsList friends={this.props.friends}/>
            </aside>
            <section className='flex-col profile-feed'>
              <PostForm isWallPost={this.props.isCurrentUser ? false : true}
                        receiver={this.props.user} />
              {postList}
            </section>
          </main> : null}
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
    isCurrentUser: state.session.currentUser.id === parseInt(ownProps.match.params.userId)
  })
};

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: userId => dispatch(fetchPosts(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
