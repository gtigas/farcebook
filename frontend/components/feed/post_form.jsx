import React from 'react';
import { connect } from 'react-redux'

class PostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { body: "" };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.createPost(post).then(
      this.setState({ body: "" })
    );
  }

  render(){
    const currentProfileFriends = this.props.receiver.friend_ids
    const currentUserId = this.props.currentUserId
    if (!currentProfileFriends.includes(currentUserId)
          && this.props.isWallPost) {
      return null 
    }
    return (
      <div className='post-form'>
        <h2>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          &nbsp;
          Create Post
        </h2>
        <form onSubmit={this.handleSubmit}>
          <img src={this.props.currentUserPic}
                width="33px"
                height="33px"
                className='circle-thumb pos-abs' />
          <textarea
            onChange={this.handleInput}
            placeholder={this.props.isWallPost ?
              `Write something to ${this.props.receiver.firstName}...` :
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
