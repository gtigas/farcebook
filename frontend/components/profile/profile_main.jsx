import React from 'react';
import ProfileHeader from './profile_header';
import ProfileAboutList from './profile-about-side';
import ProfileFriendsList from './profile_friends';
import PostForm from './profile_post_form';
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../../actions/user_actions';

class ProfileMain extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if (!this.props.user.id) {
      this.props.fetchUser(this.props.match.params.userId)
      this.props.fetchUsers();
    } else {
      this.props.fetchUser(this.props.match.params.userId)
    }
  }

  componentWillReceiveProps(newProps){
    if (this.props.user.id !== parseInt(newProps.match.params.userId)) {
      this.props.fetchUser(newProps.match.params.userId)
    }
  }


  render(){
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
            </section>
          </main> : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId] || { friend_ids:[]}
  const friends = user.friend_ids.map( id => state.entities.users[id])
  return ({
    user,
    friends,
    loading: state.ui.loading,
    isCurrentUser: state.session.currentUser.id === parseInt(ownProps.match.params.userId)
  })
};

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
