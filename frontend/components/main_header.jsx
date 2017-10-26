import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchUsers } from '../actions/user_actions';
import _ from 'lodash';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount(){
    this.props.fetchUsers();
  }


  render(){
    return (
      <header className='main-header flex-row'>
        <div className='main-nav'>
          <Link to='/feed' >
            <div id='pseudo-logo'>
              <h1>f</h1>
            </div>
          </Link>

          <div className="flex-row">
            <Link to={`/users/${this.props.userId}`}>
              <h2>{this.props.userName}</h2>
            </Link>
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
    userName: _.capitalize(state.session.currentUser.fullName.split(" ")[0]),
    userId: state.session.currentUser.id,
  }
};

const mapDispatchToProps = dispatch => ({
  logout: ()=> dispatch(logout()),
  fetchUsers: () => dispatch(fetchUsers())
});


export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
