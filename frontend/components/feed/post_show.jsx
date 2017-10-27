import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class PostShow extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading : true }
  }

  componentDidMount(){
    const { receiver, author } = this.props;
    if (receiver || author) {
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps(newProps){
    const { receiver, author } = newProps;
    if (receiver || author) {
      this.setState({ loading: false })
    }
  }


  render(){
    const { body, updated_at } = this.props.post;
    const { receiver, author, isWallPost } = this.props;
    if (this.state.loading) {
      return null
    }
    return (
      <div className='post-show'>
        <div className='flex-row'>
          <img src={author.profile_picture_url}></img>
          <div>
            <Link to={`/users/${author.id}`}>
              <h2>{author.fullName}</h2>
            </Link>
            {isWallPost &&
              <i className="fa fa-caret-right" aria-hidden="true"></i>}
            {isWallPost &&
            <Link to={`/users/${receiver.id}`}>
              <h2>{receiver.fullName}</h2>
            </Link> }

            <br></br>
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
  const post = state.entities.posts[ownProps.postId] || {}
  return {
    post,
    receiver: state.entities.users[post.receiver_id],
    author: state.entities.users[post.author_id],
    isWallPost: post.receiver_id !== post.author_id,
  }
}

const mapDispatchToProps = dispatch => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
