import React from 'react';
import { connect } from 'react-redux';
import ProfileHeaderNav from './profile_header_nav';
import ProfilePicture from './profile_picture';
import FileUploadForm from './profile_upload'
import { openModal, closeModal } from '../../actions/ui_actions';
import { fetchUsers } from '../../actions/user_actions'
import { FriendButton, requestPending } from '../../util/profile_util'
import { sendFriendRequest, deleteFriendRequest } from '../../actions/friends_actions'

class ProfileHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = { loading: true }
    this._openUpload = this._openUpload.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  componentWillUnmount() {
    this.setState({loading: true});
  }


  _openUpload(pictureType){
    return () => {
      this.setState( { pictureType })
      this.props.openModal('uploadForm');
    }
  }

  _forceUpdate(){
    this.forceUpdate();
  }



  render () {
    if (this.props.loading) return null;

    return (
      <div id='profile-header'>
        {this.props.modalOpen ? <FileUploadForm user={this.props.user}
                                                closeModal={this.props.closeModal}
                                                pictureType= {this.state.pictureType}
                                                /> : null}
        <h2>{this.props.user.fullName}</h2>
        <div id='upload-profile' onClick={this._openUpload('profile_picture')}>
          <i className="fa fa-camera"></i>
        </div>
        <div id='upload-cover' onClick={this._openUpload('cover_photo')}>
          <i className="fa fa-camera"></i>
        </div>
        <ProfilePicture url={this.props.user.profile_picture_url}/>
        <img src={this.props.user.cover_photo_url} />
        <FriendButton {...this.props} forceUpdate={this._forceUpdate}/>
        <ProfileHeaderNav />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) =>{
  return {
    modalOpen: Boolean(state.ui.modal.uploadForm),
    isCurrentUser: state.session.currentUser.id === parseInt(ownProps.userId),
    friendRequestPending: requestPending(state, ownProps.userId),
    user: state.entities.users[ownProps.userId] || {},
    currentUserId: state.session.currentUser.id
  }
};

const mapDispatchToProps = dispatch => ({
  openModal: modalType => dispatch(openModal(modalType)),
  closeModal: modalType => dispatch(closeModal(modalType)),
  addFriend: userId => () => dispatch(sendFriendRequest(userId)),
  removeFriend: userId => () => dispatch(deleteFriendRequest(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
