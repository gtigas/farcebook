import React from 'react';
import { connect } from 'react-redux'
import PostEditForm from '../feed/post_edit_form';
import { openModal, closeModal } from '../../actions/ui_actions';

class PostDropdown extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)){
      this.props.close();
    }
  };

  handleClick(){
    this.props.openModal()
  }

  render(){
    const { postId, isAuthor, modalOpen } = this.props;
    return (
      <div style={{ position: 'relative',
                    width: '0' ,
                    height: '0' ,
                    padding: '0'}}>
        <ul className='pos-abs flex-col'
            id='post-dropdown'
            ref={ (node) => this.wrapperRef=node}>
          {isAuthor &&
            <li onClick={this.handleClick}>Edit Post</li>}
            <li onClick={this.props.delete}>Delete Post</li>

            {modalOpen ?
            <PostEditForm postId={postId} /> : null}
        </ul>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  modalOpen: Boolean(state.ui.modal.editForm),
});

const mapDispatchToProps = dispatch => ({
  openModal: modalType => dispatch(openModal('editForm')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDropdown);
