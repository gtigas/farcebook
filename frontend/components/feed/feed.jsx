import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions'
import { Link } from 'react-router-dom';
import PostShow from '../feed/post_show'
import PostForm from './feed_post_form'
import { ScaleLoader } from 'react-spinners';
import _ from 'lodash';

class Feed extends React.Component{
  // componentDidMount(){
  //   this.props.fetchUsers();
  // }

  render(){
    if (this.props.loading) {
      return (
        <div className='loading'>
          <ScaleLoader color='#93949b'  />
        </div>
      )
    }
    const postList = this.props.postIds.map( id => {
      return (
        <PostShow key={id} postId={id}
                          areFriends={true}
                          isCurrentUser={true}
                          profileId={this.props.currentUser.id}/>
      )
    });

    return (
      <div id='main-container'>
        <main className='main-body'>

        <div className='main-left'></div>
        <div className='main-center flex-col pos-rel'>
          <PostForm />
          {postList}
        </div>
        <div className='main-right'></div>
      </main>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

const mapStateToProps = state => {
  const postIds = state.session.currentUser.feedIds
  return {
    postIds,
    currentUser: state.session.currentUser,
    loading: state.ui.feedLoading || state.ui.loading,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Feed)
