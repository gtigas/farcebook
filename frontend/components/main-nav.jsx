import React from 'react';

class MainNav extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <ul className='main-header-nav flex-row'>
        <li>
          <i className="fa fa-users" aria-hidden="true"></i>
        </li>
        <li>
          <i class="fa fa-globe" aria-hidden="true"></i>
        </li>
      </ul>
    )
  }
}

export default MainNav;
