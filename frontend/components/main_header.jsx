import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';

class MainHeader extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render(){
    return (
      <header className='main-header'>
        <div className='main-nav'>
          <h1>main header here</h1>
          <button onClick={this.handleLogout}
                  className='login-button'>Logout</button>
        </div>

      </header>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  logout: ()=> dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
