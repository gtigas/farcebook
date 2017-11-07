import React from 'react';
import NestedCommentList from './nested_comments'
import CommentForm from './comment_form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { convertTime } from '../../util/profile_util';
import { like, unlike } from '../../actions/likes_actions'
import { deleteComment } from '../../actions/comments_actions'
import moment from 'moment';

class CommentShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showX: true,
      showReplyForm: false,
      xStyle: { display:'none'} ,
      likerShow: false,
    }
    this.handleHover = this.handleHover.bind(this)
    this._toggleLike = this._toggleLike.bind(this)
    this._toggleReplyForm = this._toggleReplyForm.bind(this)
    this._toggleLikerShow = this._toggleLikerShow.bind(this)
  }

  handleHover(type){
    return () => {
      if (this.state.xStyle.display === 'block' && type === 'exit') {
        this.setState( { xStyle: { display:'none'} })
      } else {
        this.setState( { xStyle: { display: 'block'} })
      }
    }
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

  _toggleLikerShow(){
    this.setState({ likerShow: !this.state.likerShow })
  }

  render(){
    const { comment, author, deleteComment, likerNames,
            showX, areFriends, childComments,
            topLevelComment, isCurrentUser } = this.props
    const date = moment(comment.updated_at);
    const show = (showX && this.state.showX);
    const likerList = likerNames.map ( (name, i) => {
      return <li key={i}>{name}</li>
    })
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
              onMouseEnter={this.handleHover('enter')}
              onMouseLeave={this.handleHover('exit')}
              >
        {show &&
          <i className="fa fa-times pos-abs"
             aria-hidden="true"
             onClick={deleteComment(comment.id)}
             style={this.state.xStyle} /> }
          <img className='circle-thumb'
               src={author.profile_picture_url}
               style={style} />
          <div className='flex-col'>
            <p>
              <Link to={`/users/${author.id}`} >
                <strong>{author.fullName}</strong>
              </Link>
              {comment.body}
            </p>
            <div className='comment-show-bottom flex-row'>
              {(areFriends || isCurrentUser)  &&
              <ul className='flex-row' id='comment-nav'>
                <li onClick={this._toggleLike}>
                  {comment.currentUserLikes ? 'Unlike' : 'Like'}
                </li>
                {topLevelComment &&
                  <li onClick={this._toggleReplyForm}>Reply</li> }
              </ul>
              }
              {comment.liker_ids.length > 0 &&
                <figure className='comments-likes-show flex-row pos'>
                  <i className="fa fa-thumbs-up pos-rel"
                     aria-hidden="true"
                     onMouseEnter={this._toggleLikerShow}
                     onMouseLeave={this._toggleLikerShow}
                  >
                  { (this.state.likerShow &&  comment.liker_ids.length > 0) &&
                  <aside>
                    <h3>Like</h3>
                    <ul>{likerList}</ul>
                  </aside>
                  }
                  </i>
                  <h5>{comment.liker_ids.length} ·</h5>
                </figure>
              }
              <Link to={`/posts/${comment.post_id}` }
                    title={date.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    id='comment-time'
              >
                <i>{convertTime(comment.updated_at)}</i>
              </Link>
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
  const likerNames = comment.liker_ids.map( id => {
    return state.entities.users[id].fullName
  })
  return {
    comment,
    author,
    childComments,
    likerNames
  }
};

const mapDispatchToProps = dispatch => ({
  like: commentId => dispatch(like('comments', commentId)),
  unlike: commentId => dispatch(unlike('comments', commentId)),
  deleteComment: commentId => () => dispatch(deleteComment(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
