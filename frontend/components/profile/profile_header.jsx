import React from 'react';
import { connect } from 'react-redux';
import ProfileHeaderNav from './profile_header_nav';
import ProfilePicture from './profile_picture';
import FileUploadForm from './profile_upload'

class ProfileHeader extends React.Component{
  constructor(props){
    super(props)
    this.state = ({ modalOpen: false });
    this._openUpload = this._openUpload.bind(this);
  }

  _openUpload(){
    this.setState( {modalOpen: true})
  }

  render () {
    return (
      <div id='profile-header'>
        <FileUploadForm user={this.props.user}/> 
        <h2>{this.props.user.fullName}</h2>
        <div id='upload-profile' onClick={this._openUpload}>
          <i className="fa fa-camera"></i>
        </div>
        <ProfilePicture />
        <ProfileHeaderNav />
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(ProfileHeader)
