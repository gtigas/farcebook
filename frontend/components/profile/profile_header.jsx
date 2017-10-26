import React from 'react';
import { connect } from 'react-redux';
import ProfileHeaderNav from './profile_header_nav';
import ProfilePicture from './profile_picture';
import FileUploadForm from './profile_upload'
import { openModal, closeModal } from '../../actions/ui_actions';
import { fetchUsers } from '../../actions/user_actions'
import { friendButton } from '../../util/profile_util'
import { sendFriendRequest } from '../../actions/friends_actions'

class ProfileHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = { loading: true }
    this._openUpload = this._openUpload.bind(this);
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
        {friendButton(this.props)}
        <ProfileHeaderNav />
      </div>
    )
  }
}

const mapStateToProps = (state, { user }) =>{
  return {
    modalOpen: Boolean(state.ui.modal.uploadForm),
    isCurrentUser: state.session.currentUser.id === user.id,
    friendRequestPending: state.entities.friendRequests.sent.includes(user.id),
    areFriends: user.friend_ids.includes(state.session.currentUser.id),
  }
};

const mapDispatchToProps = dispatch => ({
  openModal: modalType => dispatch(openModal(modalType)),
  closeModal: modalType => dispatch(closeModal(modalType)),
  addFriend: userId => () => dispatch(sendFriendRequest(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
