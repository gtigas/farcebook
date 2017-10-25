import React from 'react';
import ProfileHeader from './profile_header';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';

class ProfileMain extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.userId)
  }

  render(){
    return (
      <div>
        <ProfileHeader user={this.props.user}
                      fetchUser={this.props.fetchUser}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.match.params.userId] || {}
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
