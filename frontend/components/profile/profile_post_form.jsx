import { connect } from 'react-redux'
import PostForm from '../feed/post_form'
import { createPost } from '../../actions/posts_actions'


const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

export default connect(null, mapDispatchToProps)(PostForm);
