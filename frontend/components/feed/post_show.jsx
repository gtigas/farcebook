import React from 'react';
import { connect } from 'react-redux';

class PostShow extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    // const { body, updated_at } = this.props.post;
    // const { receiver, requester, isWallPost } = this.props;
    return (
      <div className='post-show'>
        <div className='flex-row'>
          <div id='test'></div>
          <div>
            <h2>Author Name</h2>
            <i>October 2 at 8:45pm</i>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <ul className='flex-row'>
          <li>Like</li>
          <li>Comment</li>
        </ul>
        <div></div>
      </div>
    )
  }

}


export default PostShow;
