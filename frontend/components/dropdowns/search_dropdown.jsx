import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SearchDropdown extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchTerm: props.searchTerm, currentUsers: [] }
  }

  componentWillReceiveProps(newProps){
    if (newProps.searchTerm === "") {
      this.setState({
        searchTerm: "" ,
        currentUsers: []
      })
    } else {
      const searchResults = _.filter(this.props.users, user => (
        user.fullName.toLowerCase()
                      .includes(newProps.searchTerm.toLowerCase())
      ));
      this.setState({
        searchTerm: newProps.searchTerm,
        currentUsers: searchResults
      })
    }
  }

  render(){
    const userList = this.state.currentUsers.map( user => {
      return (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <figure>
              <img src={user.profile_picture_url}
                  width="22px"
                  height="22px"
                  className='circle-thumb' />
                {user.fullName}
            </figure>
          </Link>
        </div>
      )
    })
    return (
      <div id='search-dropdown'>
        {userList.length > 0 ? userList : <h4>No Search Results Found</h4>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.entities.users
})

export default connect(mapStateToProps)(SearchDropdown)
