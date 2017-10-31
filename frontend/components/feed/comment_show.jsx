import React from 'react';
import NestedCommentList from './nested_comments'
import CommentForm from './comment_form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { convertTime } from '../../util/profile_util';
import { like, unlike } from '../../actions/likes_actions'
import moment from 'moment';

class CommentShow extends React.Component {
  constructor(props){
    super(props);
    this.state = { showX: false, showReplyForm: false }
    this.handleHover = this.handleHover.bind(this)
    this._toggleLike = this._toggleLike.bind(this)
    this._toggleReplyForm = this._toggleReplyForm.bind(this)
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

  _toggleReplyForm(){
    this.setState( { showReplyForm: !this.state.showReplyForm })
  }

  render(){
    const { comment, author, deleteComment,
            showX, areFriends, childComments,
            topLevelComment } = this.props
    const date = moment(comment.updated_at);
    const show = (showX && this.state.showX);
    let style = {};
    if (!topLevelComment) {
      style = {
        height: '28px',
        width: '28px',
        margin: '7px 0 0 5px',
      }
    }
    return(
      <div>
      <div className='flex-row'
            id='comment-show'
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
            >
        {show && <i className="fa fa-times pos-abs"
          aria-hidden="true"
          onClick={deleteComment}></i> }
        <img className='circle-thumb'
            src={author.profile_picture_url}
            style={style}></img>
        <div className='flex-col'>
          <p>
            <Link to={`/users/${author.id}`} ><strong>{author.fullName}</strong></Link>
            {comment.body}
          </p>
          <div className='comment-show-bottom flex-row'>
            {areFriends &&
            <ul className='flex-row' id='comment-nav'>
              <li onClick={this._toggleLike}>
                {comment.currentUserLikes ? 'Unlike' : 'Like'}
              </li>
              {topLevelComment &&
                <li onClick={this._toggleReplyForm}>Reply</li> }
            </ul>
            }
            {comment.liker_ids.length > 0 &&
              <figure className='comments-likes-show flex-row'>
                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                <h5>{comment.liker_ids.length} ·</h5>
              </figure>
            }
            <a title={date.format("dddd, MMMM Do YYYY, h:mm:ss a")} id='comment-time'>
              <i>{convertTime(comment.updated_at)}</i>
            </a>
          </div>
        </div>
      </div>

      <div className='nested-comment-list'
        style={((childComments.length === 0) &&
                (!this.state.showReplyForm)) ? { display:'none'} : {} }>
      {topLevelComment &&
        <NestedCommentList
            childComments={childComments} {...this.props}/> }
        {(this.state.showReplyForm && topLevelComment) &&
            <CommentForm postId={comment.post_id}
            smallForm
            commentId={comment.id} /> }
      </div>

    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const comment = state.entities.comments[ownProps.commentId]
  const author = state.entities.users[comment.author_id]
  const childComments = comment.child_comment_ids.map( id => {
    return state.entities.comments[id]
  })
  return {
    comment,
    author,
    childComments,
  }
};

const mapDispatchToProps = dispatch => ({
  like: commentId => dispatch(like('comments', commentId)),
  unlike: commentId => dispatch(unlike('comments', commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
