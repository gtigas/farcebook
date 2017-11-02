import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { shuffle } from '../../util/feed_util'
import _ from 'lodash'

class PeopleYouMayKnow extends React.Component {
  constructor(props){
    super(props)
    const shownUsers = shuffle(props.users).slice(0,5);
    this.state = { shownUsers }
  }


  render() {
    const userList = this.state.shownUsers.map( user => {
      return(
        <div className='flex-col' key={user.id}>
          <Link to={`/users/${user.id}`}  className='flex-col'>
            <img src={user.profile_picture_url} id='people-pic'/>
            {user.firstName}
          </Link>
        </div>
      )
    })
    return (
      <div id='people-outer'>
        <span>
          <h2>People you may know</h2>
        </span>
        <div className='flex-row' id='people-container'>
          {userList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: _.values(state.entities.users)
})

export default connect(mapStateToProps)(PeopleYouMayKnow);
