import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions'
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Feed extends React.Component{
  // componentDidMount(){
  //   this.props.fetchUsers();
  // }

  render(){
    const userLinks = this.props.users.map( user =>{
      return (
        <li key={user.id}><Link to={`/users/${user.id}`}>{user.fullName}</Link></li>
      )
    });
    return (
      <div id='main-container'>
        <div className='main-nav feed-body flex-col'>
          <h1>News Feed Under Construction...</h1>
          <h2>List of user profiles for testing:</h2>
          <ul>
            {userLinks}
          </ul>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

const mapStateToProps = state => ({
  users: _.values(state.entities.users)
})



export default connect(mapStateToProps, mapDispatchToProps)(Feed)
