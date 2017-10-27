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
  }

  render(){
    return (
      <div className='post-form'>
        <h2>
          <i class="fa fa-pencil" aria-hidden="true"></i>
          &nbsp;
          Create Post
        </h2>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onChange={this.handleInput}
            placeholder="What's on your mind?"
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
