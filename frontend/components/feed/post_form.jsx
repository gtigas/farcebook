import React from 'react';
import { connect } from 'react-redux'

class PostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { body: "" };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorShow = this.errorShow.bind(this);
    this._hasErrors = this._hasErrors.bind(this)
  }

  handleInput(e){
    this.setState( { body: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    const post = {
      body: this.state.body,
      receiver_id: this.props.receiver.id
    }
    this.props.createPost(post).then( () =>
      this.setState({ body: "" })
    );
  }

  errorShow(){
    if (this._hasErrors()) {
      return (
        <div id='post-errors'>
          <h5>{this.props.errors[0]}</h5>
        </div>
      )
    }
  }

  _hasErrors(){
    return (this.props.errors.length > 0);
  }

  render(){
    const { loading, receiver, currentUserId, isWallPost,
            currentUserPic } = this.props

    if (loading) return null;
    const currentProfileFriends = receiver.friend_ids
    if (!currentProfileFriends.includes(currentUserId)
          && isWallPost) {
      return null
    }
    return (
      <div className='post-form'>
        {this.errorShow()}
        <h2>
          <i className="fa fa-pencil" aria-hidden="true" />
          &nbsp;
          Create Post
        </h2>
        <form onSubmit={this.handleSubmit}>
          <img src={currentUserPic}
                width="33px"
                height="33px"
                className='circle-thumb pos-abs' />
          <textarea
            onChange={this.handleInput}
            placeholder={isWallPost ?
              `Write something to ${receiver.firstName}...` :
              "What's on your mind?"}
            value={this.state.body}>
          </textarea>
          <div>
            <button>Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm;
