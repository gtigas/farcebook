import React from 'react';
import { connect } from 'react-redux';
import { years, days, months } from '../../util/signup_util'
import { signup } from '../../actions/session_actions'

class SignupForm extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createUserObject = this.createUserObject.bind(this);
    this.errorShow = this.errorShow.bind(this);
    this._hasErrors = this._hasErrors.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const user = this.createUserObject();
    this.props.signup(user);
  }

  _hasErrors(){
    return (this.props.errors.length > 0);
  }

  errorShow(){
    if (!this._hasErrors()) return null;
    const errorList = this.props.errors.map( (error,idx) => {
      return <li key={idx}>{error}</li>
    });
    return (
      <ul className='signup-error'>
        {errorList}
      </ul>
    )
  }

  createUserObject(){
    const first_name = this.first_name.value;
    const last_name = this.last_name.value;
    const email = this.email.value;
    const password = this.password.value;
    const birth_date = this.year.value + "-" +
                        this.month.value + "-" +
                        this.day.value;
    const gender = this.gender.value;
    return { first_name, last_name, email, password, birth_date, gender};
  }

  render(){
    return(
      <div id='signup-container'>
        <h2>Sign Up</h2>
        <h4>It's free and always will be.</h4>
        <form onSubmit={this.handleSubmit}>
          <span>
            <input type='text'
                  placeholder='First name'
                  ref={(input) => this.first_name = input}
                  className={(this._hasErrors()
                      && this.first_name.value.length === 0) ? 'has-errors' : null}
                  ></input>
            <input type='text'
                  placeholder='Last name'
                  ref={(input) => this.last_name = input}
                  className={(this._hasErrors()
                      && this.last_name.value.length === 0) ? 'has-errors' : null}
                  ></input>
          </span>
          <input type='text'
                placeholder='Email address'
                ref={(input) => this.email = input}
                className={(this._hasErrors()
                    && this.email.value.length === 0) ? 'has-errors' : null}
                ></input>
          <input type='password'
                placeholder='Password'
                ref={(input) => this.password = input}
                className={(this._hasErrors()
                    && this.password.value.length < 6) ? 'has-errors' : null}
                ></input>
          <label>
            Birthday <br></br>
            <select defaultValue='month'
                    ref={(input) => this.month = input}>
              <option disabled value='month'>Month</option>
              {months}
            </select>
            <select defaultValue='day'
                    ref={(input) => this.day = input}>
              <option disabled value='day'>Day</option>
              {days}
            </select>
            <select defaultValue='year'
                    ref={(input) => this.year = input}>
              <option disabled value='year'>Year</option>
              {years}
            </select>
          </label>

          <div>
            <select defaultValue='gender'
                    ref={(input) => this.gender = input}
                    className={(this._hasErrors()
                        && this.gender.value === 'gender') ? 'has-errors' : null}>
              <option disabled value='gender'>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <button id='signup-button'>Create Account</button>
        </form>
        {this.errorShow()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>({
  signup: user => dispatch(signup(user))
});

const mapStateToProps = state => ({
  errors: state.errors.signup
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
