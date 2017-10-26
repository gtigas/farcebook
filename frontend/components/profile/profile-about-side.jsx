import React from 'react'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/ui_actions';
import ProfileUpdateForm from './profile_update_form';
import { updateUser } from '../../actions/user_actions';

class ProfileAboutList extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this._conditionalRender = this._conditionalRender.bind(this)
  }

  handleClick(){
    this.props.openModal();
  }

  _conditionalRender(field){
    const user = this.props.user || {}
    let icon;
    let text;
    let value;
    switch (field) {
      case 'hometown':{
        icon = "fa fa-home";
        text = "Hometown: "
        value = user.hometown
        if (!Boolean(value) || value === "null") return null;
        break;
      }
      case 'current_city':{
        icon = "fa fa-globe";
        text = "Current City: "
        value = user.current_city
        if (!Boolean(value) || value === "null") return null;
        break;
      }
      case 'school':{
        icon = "fa fa-graduation-cap";
        text = "Studies at "
        value = user.school
        if (!Boolean(value) || value === "null") return null;
        break;
      }
      case 'workplace':{
        icon = "fa fa-briefcase";
        text = "Works at "
        value = user.workplace
        if (!Boolean(value) || value === "null") return null;
        break;
      }
    }

    return (
      <li>
        <i className={icon} aria-hidden="true"></i>
        &nbsp;
        {text}{value}
      </li>
    )
  };

  render(){
    const user = this.props.user || {}
    const bArray = user.birth_date ? user.birth_date.split("-") : null
    const userBirthday = bArray === null ? null : bArray[1] + "-" + bArray[2] + "-" + bArray[0]
    return(
      <div id='profile-about' className='pos-rel'>
        {this.props.isCurrentUser &&
              <h1 onClick={this.handleClick}>...</h1>}
        {this.props.modalIsOpen ? <ProfileUpdateForm
                                        user={user}
                                        closeModal={this.props.closeModal}
                                        updateUser={this.props.updateUser}
                                        /> : null}
        <h2><i className="fa fa-globe"></i> &nbsp; Intro</h2>
        <ul>
          <li>
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
            &nbsp;
            Email: {user.email}
          </li>
          <li>
            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
            &nbsp;
            Birthday: {userBirthday}
          </li>
          <li>
            <i className="fa fa-user" aria-hidden="true"></i>
            &nbsp;
            Gender: {_.capitalize(user.gender)}
          </li>
          {this._conditionalRender('hometown')}
          {this._conditionalRender('current_city')}
          {this._conditionalRender('school')}
          {this._conditionalRender('workplace')}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.userId],
  modalIsOpen: Boolean(state.ui.modal.updateForm),
  isCurrentUser: state.session.currentUser.id === ownProps.userId,
});

const mapDispatchToProps = dispatch => ({
  openModal: modalType => dispatch(openModal('updateForm')),
  closeModal: modalType => dispatch(closeModal('updateForm')),
  updateUser: user => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAboutList);
