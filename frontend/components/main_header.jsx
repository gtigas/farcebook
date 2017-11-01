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
    this.state = { requestDropdown: false,
                  searchDropdown: false,
                  notificationDropdown: false,
                  searchTerm: ""}
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this._toggleSearch = this._toggleSearch.bind(this);
    this.handleInput = this.handleInput.bind(this)
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount(){
    if (this.props.location.pathname === "/feed") {
      this.props.fetchFeed();
    }
    this.props.fetchRequests();
  }

  componentWillReceiveProps(newProps){
    if (newProps.location.pathname === "/feed" && this.props.loading) {
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

  handleSearch(){
    this._toggleSearch();
  }

  _toggleSearch(){
    setTimeout( () => {
      this.setState({ searchDropdown: !this.state.searchDropdown })
    }, 200)
  }

  handleInput(e){
    this.setState({searchTerm: e.target.value})
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
            <input onFocus={this.handleSearch}
                  onBlur={this._toggleSearch}
                  id='search-bar'
                  placeholder='Search'
                  value={this.state.searchTerm}
                  onChange={this.handleInput}></input>
            {this.state.searchDropdown &&
              <SearchDropdown searchTerm={this.state.searchTerm}/> }
          </div>


        {this.state.requestDropdown &&
          <FriendRequestList
            close={this.closeDropdown('requestDropdown')} />}
        {this.state.notificationDropdown &&
          <NotificationList
            close={this.closeDropdown('notificationDropdown')} />
        }

        <div className="flex-row">
          <ul className='flex-row nav-list' id='main-nav-list'>
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

          <MainNav toggle={this.toggleDropdown}
                  numRequests={this.props.numRequests}
                  />
          {this.props.numRequests > 0 &&
            <div id='num-requests'>
              {this.props.numRequests}
            </div>
          }

          {this.props.numNotifications > 0 &&
            <div id='num-requests' style={ {right: '115px'}}>
              {this.props.numNotifications}
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
  return {
    userName: _.capitalize(state.session.currentUser.firstName),
    userId: state.session.currentUser.id,
    userPic: state.session.currentUser.profile_picture_url,
    numRequests: _.keys(state.entities.friendRequests.received).length,
    numNotifications: state.session.currentUser.unreadNotifications,
  }
};

const mapDispatchToProps = dispatch => ({
  logout: ()=> dispatch(logout()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchRequests: () => dispatch(fetchFriendRequests()),
  fetchFeed: () => dispatch(fetchFeed()),
});


export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
