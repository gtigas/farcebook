import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions'

class Feed extends React.Component{
  componentDidMount(){
    this.props.fetchUsers();
  }

  render(){
    return (
      <div id='main-container'>
        <div className='main-nav feed-body'>
          <h1>Feed goes Here</h1>

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

const mapStateToProps = state => ({

})



export default connect(mapStateToProps, mapDispatchToProps)(Feed)
