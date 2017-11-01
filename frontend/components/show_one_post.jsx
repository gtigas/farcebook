import React from 'react';
import PostShow from './feed/post_show';
import { connect } from 'react-redux';

const ShowOnePost = (props) => {
  return (
    <div>
      <PostShow postId={parseInt(props.match.params.postId)}
                areFriends={true}
                isCurrentUser={true}
                profileId={props.currentUserId}
                singlePost/>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUserId: state.session.currentUser.id
})

export default connect(mapStateToProps)(ShowOnePost)
