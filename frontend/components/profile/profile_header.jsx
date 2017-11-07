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
    this.state = { loading: true, selectedTab: 'timeline' }
    this.openTab = this.openTab.bind(this)
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

  openTab(selectedTab){
    return () => {
      this.setState({ selectedTab })
      console.log(this.state.selectedTab)
    }
  }



  render () {
    const { loading, user, closeModal, modalOpen,
            pictureType, isCurrentUser } = this.props
    if (loading) return null;

    return (
      <div id='profile-header'>

        {modalOpen &&
        <FileUploadForm user={user}
                        closeModal={closeModal}
                        pictureType= {this.state.pictureType}/>
        }

        <h2>
          {user.fullName}
        </h2>

        {isCurrentUser &&
          <div id='upload-profile'
               onClick={this._openUpload('profile_picture')}>
            <i className="fa fa-camera" />
          </div>
        }

        {this.props.isCurrentUser &&
          <div id='upload-cover' onClick={this._openUpload('cover_photo')}>
            <i className="fa fa-camera"></i>
          </div>
        }

        <ProfilePicture url={user.profile_picture_url}/>
        <img src={user.cover_photo_url} />
        <FriendButton {...this.props} forceUpdate={this._forceUpdate}/>
        <ProfileHeaderNav id={user.id} openTab={this.openTab} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
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
