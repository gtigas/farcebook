import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions'
import { Link } from 'react-router-dom';
import PostForm from './feed_post_form'
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
        <main className='main-body'>

        <div className='main-left'></div>
        <div className='main-center flex-col'>
          <PostForm />
          <h1>News Feed Under Construction...</h1>
          <h2>List of user profiles for testing:</h2>
          <ul>
            {userLinks}
          </ul>
        </div>
        <div className='main-right'></div>
      </main>
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
