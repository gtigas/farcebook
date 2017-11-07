import React from 'react';
import { connect } from 'react-redux';
import ProfileHeaderNav from './profile_header_nav';
import ProfilePicture from './profile_picture';
import FileUploadForm from './profile_upload'
import { openModal, closeModal } from '../../actions/ui_actions';
import { fetchUsers } from '../../actions/user_actions'
import { withRouter } from 'react-router'
import { FriendButton, requestPending } from '../../util/profile_util'
import { sendFriendRequest, deleteFriendRequest } from '../../actions/friends_actions'

class ProfileHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = { loading: true, selectedTab: 'timeline' }
    this._openUpload = this._openUpload.bind(this);
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  componentWillUnmount() {
    this.setState({loading: true});
  }

  componentWillReceiveProps(newProps){
    if (newProps.location.pathname.includes('friends')) {
      this.setState({ selectedTab: 'friends'} )
    } else {
      this.setState({ selectedTab: 'timeline'} )
    }
  }

  _openUpload(pictureType){
    return () => {
      this.setState( { pictureType })
      this.props.openModal('uploadForm');
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
        <ProfileHeaderNav id={user.id} openTab={this.state.selectedTab} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHeader))
