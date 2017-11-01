import React from 'react';
import { updatePost } from '../../actions/posts_actions'
import { connect } from 'react-redux'
import { openModal, closeModal } from '../../actions/ui_actions';


class PostEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { body: props.post.body || "" };
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
      id: this.props.post.id,
      body: this.state.body,
    }
    this.props.updatePost(post)
    this.props.closeModal();
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
    return (
      <div>
        <div className='post-form pos-abs' id='post-edit'>
          {this.errorShow()}
          <h2>
            <i className="fa fa-pencil" aria-hidden="true"></i>
            &nbsp;
            Edit Post
          </h2>
          <form onSubmit={this.handleSubmit}>
            <textarea
              onChange={this.handleInput}
              value={this.state.body}>
            </textarea>
            <div>
              <button>Edit</button>
            </div>
          </form>
        </div>
        
        <div className='modal-screen' onClick={this.props.closeModal}>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.entities.posts[ownProps.postId],
  currentUserId: state.session.currentUser.id,
  errors: state.errors.posts
})

const mapDispatchToProps = dispatch => ({
  updatePost: post => dispatch(updatePost(post)),
  openModal: modalType => dispatch(openModal('editForm')),
  closeModal: modalType => dispatch(closeModal('editForm')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEditForm);
