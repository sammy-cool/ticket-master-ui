import React from 'react' 
import TicketForm from './Form'

class TicketNew extends React.Component {
 

    render() {
        return (
            <div>
                <h2>Add Ticket</h2>
                <TicketForm />
            </div> 
        )
    }
}

export default TicketNew