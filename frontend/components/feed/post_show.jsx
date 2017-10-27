import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertTime } from '../../util/profile_util';
import PostDropdown from '../dropdowns/post_dropdown'
import { deletePost } from '../../actions/posts_actions'

class PostShow extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading : true, dropdown: false }
    this.toggleDropdown = this.toggleDropdown.bind(this)
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

  toggleDropdown(){
    this.setState( { dropdown: !this.state.dropdown})
  }


  render(){
    const { body, updated_at, id } = this.props.post;
    const { receiver, author, isWallPost, currentUserId } = this.props;
    if (this.state.loading) {
      return null
    }
    const currUserIsAuthorOrReceiver = (author.id === currentUserId) ||
                                        (receiver.id === currentUserId)
    return (
      <div className='post-show'>
        {currUserIsAuthorOrReceiver &&
        <h3 className='pos-abs' onClick={this.toggleDropdown}>...</h3>}
        {this.state.dropdown &&
                  <PostDropdown close={this.toggleDropdown}
                                delete={this.props.delete(id)}/> }
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
            <i>{convertTime(updated_at)}</i>
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
    currentUserId: state.session.currentUser.id
  }
}

const mapDispatchToProps = dispatch => ({
  delete: postId =>  () => dispatch(deletePost(postId))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
