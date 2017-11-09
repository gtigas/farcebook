import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchUsers } from '../actions/user_actions';
import { fetchFeed } from '../actions/posts_actions';
import { fetchFriendRequests } from '../actions/friends_actions'
import FriendRequestList from './dropdowns/friend_requests'
import SearchDropdown from './dropdowns/search_dropdown'
import NotificationList from './dropdowns/notifications'
import MainNav from './main-nav'
import _ from 'lodash';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      requestDropdown: false,
      searchDropdown: false,
      notificationDropdown: false,
      searchTerm: "",
      cursor: 0,
    }
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount(){
    const { location } = this.props
    this.props.fetchFeed();
    this.props.fetchRequests();
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
    const { searchDropdown, requestDropdown,
            notificationDropdown, searchTerm, cursor } = this.state
    const { numNotifications, userName,
              userId, userPic, numRequests} = this.props

    return (
      <header className='main-header flex-row'>
        <div className='main-nav'>
          <div className='flex-row'>
            <Link to='/' >
              <div id='pseudo-logo'>
                <h1>f</h1>
              </div>
            </Link>

              <SearchDropdown/>
              <i className="fa fa-search"
                 aria-hidden="true"
                 id='search-button'>
              </i>
          </div>


        {requestDropdown &&
          <FriendRequestList
            close={this.closeDropdown('requestDropdown')} />
        }
        {notificationDropdown &&
          <NotificationList
            close={this.closeDropdown('notificationDropdown')} />
        }

        <div className="flex-row">
          <ul className='flex-row nav-list' id='main-nav-list'>
            <li className='flex-row'>
              <img src={userPic}
                    width="25px"
                    height="25px"
                    className='circle-thumb' />
              <Link to={`/users/${userId}`}>
                <h2>{userName}</h2>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <h2>Home</h2>
              </Link>
            </li>
          </ul>

          <MainNav toggle={this.toggleDropdown}
                  numRequests={numRequests}
                  />
          {numRequests > 0 &&
            <div id='num-requests'>
              {numRequests}
            </div>
          }

          {numNotifications > 0 &&
            <div id='num-requests' style={ {right: '115px'}}>
              {numNotifications}
            </div>
          }
          <button onClick={this.handleLogout}
            className='login-button'>Logout</button>
          </div>
        </div>


      </header>
    )
  }
}

const mapStateToProps = state =>  {
  const notifs = state.entities.notifications
  const numUnreadNotifications = notifs.filter( notif => notif.unread).length
  return {
    userName: _.capitalize(state.session.currentUser.firstName),
    userId: state.session.currentUser.id,
    userPic: state.session.currentUser.profile_picture_url,
    numRequests: _.keys(state.entities.friendRequests.received).length,
    numNotifications: numUnreadNotifications,
  }
};

const mapDispatchToProps = dispatch => ({
  logout: ()=> dispatch(logout()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchRequests: () => dispatch(fetchFriendRequests()),
  fetchFeed: () => dispatch(fetchFeed()),
});


export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
