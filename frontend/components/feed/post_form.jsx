import React from 'react';
import { connect } from 'react-redux'

class PostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { body: "",  imageFile: null, imageUrl: null  };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorShow = this.errorShow.bind(this);
    this._hasErrors = this._hasErrors.bind(this)
    this.handleKeypress = this.handleKeypress.bind(this)
    this.updateFile = this.updateFile.bind(this)
  }

  handleInput(e){
    this.setState( { body: e.target.value })
  }

  handleKeypress(e){
    if (e.charCode == 13) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const file = this.state.imageFile;
    const formData = new FormData();
    if (file) formData.append(`post[image]`, file);
    formData.append('post[body]', this.state.body)
    formData.append('post[receiver_id]', this.props.receiver.id)
    // const post = {
    //   body: this.state.body,
    //   receiver_id: this.props.receiver.id
    // }
    this.props.createPost(formData).then( () =>
      this.setState({
        body: "",
        imageFile: null,
        imageUrl: null
      })
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

  updateFile(e){
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file});

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState( { imageUrl: "", imageFile: null } );
    }
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
            onKeyPress={this.handleKeypress}
            style={this.state.imageUrl ? { width:'375px'} : {} }
            placeholder={isWallPost ?
              `Write something to ${receiver.firstName}...` :
              "What's on your mind?"}
            value={this.state.body}>
          </textarea>
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} id='post-img-preview' />
          }
          <div>
            <div id='upload-photo'>
              <label htmlFor="file" className='flex-row'>
                <i className="fa fa-picture-o" aria-hidden="true"></i>
                <h3>Photo</h3>
              </label>

              <input type='file'
                     id='file'
                     className='pos-abs'
                     onChange={this.updateFile}
              >
              </input>
            </div>
            <button>Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm;
