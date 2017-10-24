import React from 'react';
import { connect } from 'react-redux';

const ProfileHeader = (props) => (
  <div id='profile-header'>
    <h1>Profile Header</h1>
  </div>
);

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(ProfileHeader)
