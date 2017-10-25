import React from 'react';
import { connect } from 'react-redux'
import { updateUser } from '../../actions/user_actions';

class FileUploadForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { imageFile: null, imageUrl: null };
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateFile(e){
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file});

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState( { imageUrl: "", imageFile: null } );
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const { user, pictureType } = this.props;
    const file = this.state.imageFile;
    const formData = new FormData();
    // our backend can't handle a null image, so why even
    if (file) formData.append(`user[${pictureType}]`, file);
    Object.keys(user).map( (key, idx) => {
      if (key !== 'fullName') {
        formData.append(`user[${key}]`, user[key]);
      }
    });
    debugger
    this.props.updatePicture(formData)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='file' onChange={this.updateFile}/>
          <button>Upload Photo!</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user,
    pictureType: 'profile_picture'
  }
};

const mapDispatchToProps = dispatch => ({
  updatePicture: user => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadForm)
