import React from 'react';

const PostDropdown = (props) => {
  return (
    <ul className='pos-abs flex-col' id='post-dropdown'>
      {/* <li>Edit Post</li> */}
      <li onClick={props.delete}>Delete Post</li>
    </ul>
  )
}

export default PostDropdown;
