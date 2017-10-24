import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions'

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  login: user => (dispatch(login(user))),
});

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: "", password: "" }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field){
    return (e) => {
      this.setState( { [field]: e.target.value })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState( { password : "" })
    this.props.login(this.state);
  }

  render(){
    return(
      <div className='login-container'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <label>
            Email
            <input type='text'
                   onChange={this.handleInput('email')}
                   value={this.state.email}/>
          </label>

          <label>
            Password
            <input type='password'
                   onChange={this.handleInput('password')}
                   value={this.state.password} />
          </label>

          <button>Log In</button>
        </form>
      </div>
    )
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
