import React from 'react'
import { connect } from 'react-redux'

import { startGetUser } from '../../../actions/userAction'

class Dashboard extends React.Component {
   componentDidMount() {
       const token = localStorage.getItem('authToken')
       this.props.dispatch(startGetUser(token))
   }
    render(){
        return (
            <div>
                <h4>Welcome {this.props.user.username}</h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Dashboard)