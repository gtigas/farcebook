import React from 'react';
import { connect } from 'react-redux';
import ProfileHeaderNav from './profile_header_nav';
import ProfilePicture from './profile_picture';

class ProfileHeader extends React.Component{

  render () {
    return (
      <div id='profile-header'>
        <h2>{this.props.user.fullName}</h2>
        <ProfilePicture />
        <ProfileHeaderNav />
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(ProfileHeader)
