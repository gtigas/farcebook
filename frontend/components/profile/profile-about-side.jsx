import React from 'react'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/ui_actions';
import ProfileUpdateForm from './profile_update_form';
import { updateUser } from '../../actions/user_actions';

class ProfileAboutList extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.openModal();
  }


  render(){
    return(
      <div id='profile-about'>
        <h1 onClick={this.handleClick}>click</h1>
        {this.props.modalIsOpen ? <ProfileUpdateForm
                                        user={this.props.user}
                                        closeModal={this.props.closeModal}
                                        updateUser={this.props.updateUser}
                                        /> : null}
        <h2><i className="fa fa-globe"></i> &nbsp; Intro</h2>
        <ul>
          <li>Under construction...</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[ownProps.userId],
  modalIsOpen: Boolean(state.ui.modal.updateForm)
});

const mapDispatchToProps = dispatch => ({
  openModal: modalType => dispatch(openModal('updateForm')),
  closeModal: modalType => dispatch(closeModal('updateForm')),
  updateUser: user => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAboutList);
