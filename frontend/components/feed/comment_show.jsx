import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment';

const CommentShow = ({ comment, author, deleteComment, showX }) => {
  const date = moment(comment.updated_at);
  return(
    <div className='flex-row' id='comment-show'>
      {showX && <i className="fa fa-times pos-abs"
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
            <li>Like</li>
            <li>Reply</li>
          </ul>
          <a title={date.format("dddd, MMMM Do YYYY, h:mm:ss a")} id='comment-time'>
            <i>{date.fromNow(true)}</i>
          </a>
        </div>
      </div>
    </div>
  )
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

});

export default connect(mapStateToProps, mapDispatchToProps)(CommentShow);
