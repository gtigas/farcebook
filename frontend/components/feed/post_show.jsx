import React from 'react';
import { connect } from 'react-redux';

class PostShow extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    const { body, updated_at } = this.props.post;
    const { receiver, author, isWallPost } = this.props;
    return (
      <div className='post-show'>
        <div className='flex-row'>
          <img src={author.profile_picture_url}></img>
          <div>
            <h2>{author.fullName}</h2>
            <i>October 2 at 8:45pm</i>
          </div>
        </div>
        <p>{body}</p>
        <ul className='flex-row'>
          <li>Like</li>
          <li>Comment</li>
        </ul>
        <div></div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const post = state.entities.posts[ownProps.postId]
  return {
    post,
    receiver: state.entities.users[post.receiver_id],
    author: state.entities.users[post.author_id],
    isWallPost: post.receiver_id === post.author_id,
  }
}

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
