import React from 'react';
import { connect } from 'react-redux';
import { years, days, months } from '../../util/signup_util'
import { signup } from '../../actions/session_actions'

class SignupForm extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createUserObject = this.createUserObject.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const user = this.createUserObject();
    this.props.signup(user);
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
                  ></input>
            <input type='text'
                  placeholder='Last name'
                  ref={(input) => this.last_name = input}
                  ></input>
          </span>
          <input type='text'
                placeholder='Email address'
                ref={(input) => this.email = input}
                ></input>
          <input type='password'
                placeholder='Password'
                ref={(input) => this.password = input}
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
                    ref={(input) => this.gender = input}>
              <option disabled value='gender'>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <button id='signup-button'>Create Account</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>({
  signup: user => dispatch(signup(user))
});

export default connect(null, mapDispatchToProps)(SignupForm);
