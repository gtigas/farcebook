import { connect } from 'react-redux'
import PostForm from './post_form'
import { createPost } from '../../actions/posts_actions'

const mapStateToProps = state => ({
  receiver: state.session.currentUser,
  currentUserPic: state.session.currentUser.profile_picture_url,
  errors: state.errors.posts
});

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
