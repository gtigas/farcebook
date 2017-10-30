import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions'

const mapStateToProps = state => ({
  errors: state.errors.login,
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
    this.errorShow = this.errorShow.bind(this);
    this._hasErrors = this._hasErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
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

  handleDemo(e) {
    e.preventDefault();
    const demoLogin = {
      email: "kermit@TheMuppetShow.com",
      password: "asdf123"}
    this.props.login(demoLogin)
  }

  errorShow(){
    if (!this._hasErrors()) return null;
    return (
      <div className='login-error'><h5>{this.props.errors[0]}</h5></div>
    )
  }

  _hasErrors(){
    return (this.props.errors.length > 0);
  }

  render(){
    return(
      <div className='login-container'>
        <form className='login-form'>
          {this.errorShow()}
          <label>
            Email
            <input type='text'
                   onChange={this.handleInput('email')}
                   value={this.state.email}
                  className={this._hasErrors() ? 'has-errors' : null}/>
          </label>

          <label>
            Password
            <input type='password'
                   onChange={this.handleInput('password')}
                   value={this.state.password}
                 className={this._hasErrors() ? 'has-errors' : null}/>
          </label>

          <button className='login-button' onClick={this.handleSubmit}>Log In</button>
          <button className='login-button' onClick={this.handleDemo}>Demo</button>
        </form>
      </div>
    )
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
