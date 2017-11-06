import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertTime } from '../../util/profile_util';
import PostDropdown from '../dropdowns/post_dropdown'
import { deletePost, fetchPost } from '../../actions/posts_actions'
import { deleteComment } from '../../actions/comments_actions'
import { openModal, closeModal } from '../../actions/ui_actions';
import { like, unlike } from '../../actions/likes_actions';
import CommentForm from './comment_form'
import CommentShow from './comment_show'
import moment from 'moment'

class PostShow extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading : true, dropdown: false, likerShow: false }
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.setNameInput = this.setNameInput.bind(this)
    this._toggleLike = this._toggleLike.bind(this)
    this._toggleLikerShow = this._toggleLikerShow.bind(this)
  }

  componentDidMount(){
    const { receiver, author, singlePost, headerLoading } = this.props;
    if (receiver || author) {
      this.setState({ loading: false })
    }
    if (!Boolean(receiver) && singlePost && !headerLoading) {
      this.props.fetchPost(this.props.postId)
    }
  }

  componentWillReceiveProps(newProps){
    const { receiver, author } = newProps;
    if (this.props.singlePost && newProps.postId !== this.props.postId) {
      this.props.fetchPost(newProps.postId)
      this.setState({ loading: true })
    } else if (receiver || author) {
      this.setState({ loading: false })
    }
    if (!Boolean(receiver) && this.props.singlePost) {
      this.props.fetchPost(this.props.postId)
    }
  }

  setNameInput(input){
    this.nameInput = input
  }

  toggleDropdown(){
    this.setState( { dropdown: !this.state.dropdown})
  }

  _toggleLike(){
    if (this.props.post.currentUserLikes) {
      this.props.unlike(this.props.post.id)
    } else {
      this.props.like(this.props.post.id)
    }
  }

  _toggleLikerShow(){
    this.setState({ likerShow: !this.state.likerShow })
  }


  render(){
    const { body, updated_at, id, imageUrl,
      currentUserLikes, liker_ids, receiver_id } = this.props.post;
    const { receiver, author, isWallPost, likerNames,
          currentUserId, comments, profileId, deleteComment,
              areFriends, isCurrentUser, singlePost } = this.props;

    if (this.state.loading) return null;

    const postTime = moment(updated_at);
    const likerList = likerNames.map ( (name, i) => {
      return <li key={i}>{name}</li>
    })
    const parentComments = comments.filter( comment => {
      return !Boolean(comment.parent_comment_id)
    })
    const commentList = parentComments.map( comment => {
      const show = (comment.author_id === currentUserId) ||
                  (receiver_id === currentUserId)
      return <CommentShow
                    key={comment.id}
                    commentId={comment.id}
                    showX={show}
                    areFriends={areFriends}
                    isCurrentUser={isCurrentUser}
                    topLevelComment
                  />
    })
    const style = singlePost ? { margin:'0 auto', marginTop: '15px' } : {}
    const currUserIsAuthorOrReceiver = (author.id === currentUserId) ||
                                        (receiver.id === currentUserId)
    return (
      <div className='post-show' style={style}>
        {currUserIsAuthorOrReceiver &&
        <h3 className='pos-abs' onClick={this.toggleDropdown}>
          ...
        </h3>
      }
        {this.state.dropdown &&
        <PostDropdown close={this.toggleDropdown}
                      delete={this.props.delete(id)}
                      postId={id}
                      isAuthor={author.id === currentUserId}/> }
        <div className='flex-row'>
          <img src={author.profile_picture_url}/>
          <div>
            <Link to={`/users/${author.id}`}>
              <h2>{author.fullName}</h2>
            </Link>
            {isWallPost &&
              <i className="fa fa-caret-right" aria-hidden="true"/>}
            {isWallPost &&
            <Link to={`/users/${receiver.id}`}>
              <h2>{receiver.fullName}</h2>
            </Link> }

            <br></br>
            <Link to={`/posts/${id}`}>
              <i title={postTime.format("dddd, MMMM Do YYYY, h:mm:ss a")}>
                {convertTime(updated_at)}
              </i>
            </Link>
          </div>
        </div>

        <p>{body}</p>

        {imageUrl !== 'null' &&
          <img src={imageUrl} id='post-image'/>
        }


        {(areFriends || isCurrentUser) &&
        <ul className='flex-row' id='post-nav'>
          <li style={ currentUserLikes ? { color: '#598dfb'} : {} }
              onClick={this._toggleLike}>
            <i
              style={ currentUserLikes ? { color: '#598dfb'} : {} }
              className="fa fa-thumbs-o-up"
              aria-hidden="true" />
          { currentUserLikes ?  "Unlike" : "Like"  }
          </li>
          <li onClick={ () => this.nameInput.focus()}>
            <i className="fa fa-comment-o" aria-hidden="true" />
            Comment
          </li>
        </ul>
        }

        <div className='comment-area flex-col'>
          {liker_ids.length > 0 &&
            <h5 className='post-likes-show'>
              <i className="fa fa-thumbs-up pos-rel"
                aria-hidden="true"
                onMouseEnter={this._toggleLikerShow}
                onMouseLeave={this._toggleLikerShow}>
                { (this.state.likerShow &&  liker_ids.length > 0) &&
                <aside>
                  <h3>Like</h3>
                  <ul>{likerList}</ul>
                </aside>
                }
              </i>
              {liker_ids.length}
            </h5>
          }

          {commentList}

          {(areFriends || isCurrentUser) &&
            <CommentForm postId={id}  nameInput={this.setNameInput}/>
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const post = state.entities.posts[ownProps.postId] ||
                                      { comment_ids: [], liker_ids: [] }
  const comments = post.comment_ids.map( id => {
    return state.entities.comments[id]
  })
  const likerNames = post.liker_ids.map( id => {
    return state.entities.users[id].fullName
  })
  return {
    post,
    comments,
    likerNames,
    headerLoading: state.ui.loading,
    receiver: state.entities.users[post.receiver_id],
    author: state.entities.users[post.author_id],
    isWallPost: post.receiver_id !== post.author_id,
    currentUserId: state.session.currentUser.id,
  }
}

const mapDispatchToProps = dispatch => ({
  delete: postId =>  () => dispatch(deletePost(postId)),
  like: postId => dispatch(like('posts', postId)),
  unlike: postId => dispatch(unlike('posts', postId)),
  fetchPost: postId => dispatch(fetchPost(postId))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
