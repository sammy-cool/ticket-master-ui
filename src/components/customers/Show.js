import React from 'react' 

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { findCustomer } from '../../selectors/customersSelector'

function CustomerShow(props) {
    return (
        <div>
            <h2>Customer Show</h2>
            <p> { props.customer?.name } - 
                { props.customer?.mobile}
            </p>

            <h2>Listing Tickets</h2>
            <ul>
                { props.tickets.map(ticket => {
                    return <li key={ticket._id}>{ ticket.code }</li>
                })}
            </ul>
            <Link to="/customers">Back</Link>
        </div> 
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    return {
        customer: findCustomer(state.customers, id),
        tickets: state.tickets.filter(ticket => ticket.customer === id)
    }
}

export default connect(mapStateToProps)(CustomerShow)