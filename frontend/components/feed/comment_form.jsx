import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comments_actions'

class CommentForm extends React.Component{
  constructor(props){
    super(props)
    this.state = { body: "" }
    this.handleInput = this.handleInput.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
  }

  handleInput(e){
    this.setState({ body: e.target.value })
  }


  handleKeypress(e){
    const { postId, smallForm, commentId, createComment } = this.props
    if (e.charCode == 13) {
      e.preventDefault();
      const comment = { body: this.state.body, post_id: postId};
      if (smallForm) {
        comment.parent_comment_id = commentId
      }
      createComment(comment).then(
        () => this.setState({ body: "" })
      )
      this.setState({ body: ""})
    }
  }

  render(){
    const { smallForm, nameInput, currentUserPic } = this.props
    const imgStyle = smallForm ? {
      margin: '0 4px',
      height: '28px',
      width: '28px',
    } : {}
    const inputStyle = smallForm ? {
      width: '369px',
      height: '25px',
      margin: '0'
    } : {}
    return(
      <div className='comment-form flex-row'>
        <img src={currentUserPic}
            style={imgStyle}
            className='circle-thumb'></img>
        <input type='text'
          onChange={this.handleInput}
          onKeyPress={this.handleKeypress}
          value={this.state.body}
          ref={nameInput || null}
          style={inputStyle}
          placeholder={smallForm ? 'Write a reply...' :
                                  'Write a comment...'}></input>
      </div>
    )
  }
}


const mapStateToProps = state  => ({
  currentUserPic: state.session.currentUser.profile_picture_url,
})

const mapDispatchToProps = dispatch => ({
  createComment: comment => dispatch(createComment(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
