import React from 'react';

class MainNav extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <ul className='main-header-nav flex-row' id='main-nav-list2'>
        <li onClick={this.props.toggle('requestDropdown')}>
          <i className="fa fa-users" aria-hidden="true"></i>
        </li>
        <li>
          <i className="fa fa-globe" aria-hidden="true"></i>
        </li>
      </ul>
    )
  }
}

export default MainNav;
