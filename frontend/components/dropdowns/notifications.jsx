import React from 'react';
import { connect } from 'react-redux';
import { readNotification } from '../../actions/notifications_actions'
import _ from 'lodash';

class NotificationList extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='request-list pos-abs'>
        <h3>Notifications</h3>
        <ul>
          stuff
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notifications: _.values(state.entities.notifications)
})

const mapDispatchToProps = dispatch => ({
  readNotification: notification => dispatch(readNotification(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
