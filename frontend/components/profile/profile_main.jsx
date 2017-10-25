import React from 'react';
import ProfileHeader from './profile_header';
import { connect } from 'react-redux';

const ProfileMain = () => {
  return (
    <div>
      <ProfileHeader />
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId]
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
