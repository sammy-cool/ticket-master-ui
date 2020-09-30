import React from 'react' 
import TicketForm from './Form'
import { connect } from 'react-redux'
import { findTicket } from '../../selectors/ticketsSelector'

class TicketEdit extends React.Component {

    render(){
        return (
            <div>
                <h2>Edit Ticket</h2>
                { 
                    this.props.ticket ? <TicketForm ticket={this.props.ticket} /> : 'loading....'
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id 
    return {
        ticket: findTicket(state.tickets, id)
    }
}

export default connect(mapStateToProps)(TicketEdit)