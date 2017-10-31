import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { like, unlike } from '../../actions/likes_actions'
import moment from 'moment';

class CommentShow extends React.Component {
  constructor(props){
    super(props);
    this.state = { showX: false }
    this.handleHover = this.handleHover.bind(this)
    this._toggleLike = this._toggleLike.bind(this)
  }

  handleHover(){
    this.setState( { showX: !this.state.showX })
  }

  _toggleLike(){
    if (this.props.comment.currentUserLikes) {
      this.props.unlike(this.props.comment.id)
    } else {
      this.props.like(this.props.comment.id)
    }
  }

  render(){
    const { comment, author, deleteComment, showX } = this.props
    const date = moment(comment.updated_at);
    const show = (showX && this.state.showX)
    return(
      <div className='flex-row'
            id='comment-show'
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}>
        {show && <i className="fa fa-times pos-abs"
          aria-hidden="true"
          onClick={deleteComment}></i> }
        <img className='circle-thumb' src={author.profile_picture_url}></img>
        <div className='flex-col'>
          <p>
            <Link to={`/users/${author.id}`} ><strong>{author.fullName}</strong></Link>
            {comment.body}
          </p>
          <div className='comment-show-bottom flex-row'>
            <ul className='flex-row' id='comment-nav'>
              <li onClick={this._toggleLike}>
                {comment.currentUserLikes ? 'Unlike' : 'Like'}
              </li>
              <li>Reply</li>
            </ul>
            {comment.liker_ids.length > 0 &&
              <figure className='comments-likes-show flex-row'>
                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                <h5>{comment.liker_ids.length} ·</h5>
              </figure>
            }
            <a title={date.format("dddd, MMMM Do YYYY, h:mm:ss a")} id='comment-time'>
              <i>{date.fromNow(true)}</i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const comment = state.entities.comments[ownProps.commentId]
  const author = state.entities.users[comment.author_id]
  return {
    comment,
    author,
  }
};

const mapDispatchToProps = dispatch => ({
  like: commentId => dispatch(like('comments', commentId)),
  unlike: commentId => dispatch(unlike('comments', commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
