import { connect } from 'react-redux'
import PostForm from '../feed/post_form'
import { createPost } from '../../actions/posts_actions'

const mapStateToProps = state => ({
  currentUserPic: state.session.currentUser.profile_picture_url,
  currentUserId: state.session.currentUser.id,
  errors: state.errors.posts
})

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
