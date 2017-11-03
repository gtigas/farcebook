import React from 'react';
import { connect } from 'react-redux';

class ProfileUpdateForm extends React.Component{
  constructor(props){
    super(props);
    const user = this.props.user
    this.state= {
      first_name: user.fullName.split(" ")[0] || "",
      last_name: user.fullName.split(" ").slice(1).join(" ") || "",
      gender: user.gender || "",
      hometown: user.hometown || "",
      current_city: user.current_city || "",
      school: user.school || "",
      workplace: user.workplace || ""
    }

    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field){
    return (e) => { this.setState( { [field]: e.target.value })}
  }

  handleSubmit(e){
    e.preventDefault();
    const params = { id:this.props.user.id, user: this.state }
    this.props.updateUser(params)
    this.props.closeModal('updateForm')
  }

  render(){
    return (
      <div className='pos-abs'>
        <div id='profile-update-container'>
          <form onSubmit={this.handleSubmit} className='flex-col'>
            <h2>Update Profile</h2>
            <label>First Name
              <input type='text'
                onChange={this.handleChange('first_name')}
                value={this.state.first_name}/>
            </label>
            <label>Last Name
                <input type='text'
                  onChange={this.handleChange('last_name')}
                  value={this.state.last_name}/>
            </label>
            <label>Gender
              <select value={this.state.gender || 'gender'}
                onChange={this.handleChange('gender')}>
                <option disabled value='gender'>Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </label>
            <label>Hometown
              <input type='text'
                    onChange={this.handleChange('hometown')}
                    value={this.state.hometown}/>
            </label>
            <label>Current City
              <input type='text'
                onChange={this.handleChange('current_city')}
                value={this.state.current_city}/>
            </label>
            <label>School
              <input type='text'
                onChange={this.handleChange('school')}
                value={this.state.school}/>
            </label>
            <label>Workplace
              <input type='text'
                onChange={this.handleChange('workplace')}
                value={this.state.workplace}/>
            </label>

            <button>Update Profile</button>
          </form>
        </div>
        <div className='modal-screen' onClick={this.props.closeModal}></div>
      </div>
                )
  }
}

export default ProfileUpdateForm;
