import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchUsers } from '../actions/user_actions';
import { fetchFeed } from '../actions/posts_actions';
import { fetchFriendRequests } from '../actions/friends_actions'
import FriendRequestList from './dropdowns/friend_requests'
import MainNav from './main-nav'
import _ from 'lodash';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { requestDropdown: false }
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount(){
    if (this.props.match.path === "/") {
      this.props.fetchFeed();
    }
  }

  closeDropdown(type) {
    return () => {this.setState({ [type]: false } )}
  }

  openDropdown(type) {
    return () => {this.setState( { [type]: true })}
  }

  toggleDropdown(type){
    const value = this.state[type] ? false : true
    return() => {this.setState( { [type]: value })}
  }


  render(){
    return (
      <header className='main-header flex-row'>
        <div className='main-nav'>
          <div className='flex-row'>
            <Link to='/feed' >
              <div id='pseudo-logo'>
                <h1>f</h1>
              </div>
            </Link>
            <input id='search-bar' placeholder='Search'></input>
          </div>


        {this.state.requestDropdown &&
          <FriendRequestList
            close={this.closeDropdown('requestDropdown')} />}

        <div className="flex-row">
          <ul className='flex-row nav-list'>
            <li className='flex-row'>
              <img src={this.props.userPic}
                    width="25px"
                    height="25px"
                    className='circle-thumb' />
              <Link to={`/users/${this.props.userId}`}>
                <h2>{this.props.userName}</h2>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <h2>Home</h2>
              </Link>
            </li>
          </ul>

          <MainNav toggle={this.toggleDropdown} numRequests={this.props.numRequests}/>

          <button onClick={this.handleLogout}
            className='login-button'>Logout</button>
          </div>

        </div>

      </header>
    )
  }
}

const mapStateToProps = state =>  {
  return {
    userName: _.capitalize(state.session.currentUser.firstName),
    userId: state.session.currentUser.id,
    userPic: state.session.currentUser.profile_picture_url,
    numRequests: _.keys(state.entities.friendRequests).count,
  }
};

const mapDispatchToProps = dispatch => ({
  logout: ()=> dispatch(logout()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchRequests: () => dispatch(fetchFriendRequests()),
  fetchFeed: () => dispatch(fetchFeed()),
});


export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
