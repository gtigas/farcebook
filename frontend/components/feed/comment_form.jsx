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
    if (e.charCode == 13) {
      e.preventDefault();
      const comment = { body: this.state.body, post_id: this.props.postId};
      this.props.createComment(comment).then(
        () => this.setState({ body: "" })
      )
      this.setState({ body: ""})
    }
  }

  render(){
    return(
      <div className='comment-form flex-row'>
        <img src={this.props.currentUserPic} className='circle-thumb'></img>
        <input type='text'
          onChange={this.handleInput}
          onKeyPress={this.handleKeypress}
          value={this.state.body}
          ref={this.props.nameInput}
          placeholder='Write a comment...'></input>
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
