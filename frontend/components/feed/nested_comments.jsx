import React from 'react';
import CommentShow from './comment_show'
import { deleteComment } from '../../actions/comments_actions'

class NestedCommentList extends React.Component {
  render () {
    const { childComments } = this.props;
    const commentsList = childComments.map( comment => {
      const show = (comment.author_id === this.props.currentUserId) ||
                  (this.props.profileId === this.props.currentUserId)
      return (
        <CommentShow key={comment.id}
                    commentId={comment.id}
                    deleteComment={deleteComment(comment.id)}
                    showX={this.props.show}
                    areFriends={this.props.areFriends} />
      )
    })
    return (
      <div>
        {commentsList}
      </div>
    )
  }
}

export default NestedCommentList
