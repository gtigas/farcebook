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
      <header>
        <h1>main header here</h1>
        <button onClick={this.handleLogout}>Logout</button>
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
