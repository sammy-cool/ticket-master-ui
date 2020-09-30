import React from 'react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { findCustomer } from '../../selectors/customersSelector'
import { findDepartment } from '../../selectors/departmentsSelector'
import { selectEmpName } from '../../selectors/employeesSelector'
import { startGetTickets, startRemoveTicket } from '../../actions/ticketsAction'

class TicketsList extends  React.Component {
    constructor() {
        super()
        this.state = {
            search: ''
        }
    }
    componentDidMount() {
        this.props.dispatch(startGetTickets())
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove) {
            this.props.dispatch(startRemoveTicket(id))
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){ 
        return (
            <div>
                <h2>Listing Tickets - { this.props.tickets.length }</h2>
                <input type="text" value={this.state.search} onChange={this.handleChange} name="search" placeholder="enter code" />
                <table>
                    <thead>
                        <tr>
                            <th> code </th>
                            <th> customer </th> 
                            <th> department </th> 
                            <th> employees </th> 
                            <th> priority </th> 
                            <th> message </th> 
                            <th> action </th> 
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.tickets.filter(tick => tick.code.includes(this.state.search)).map(ticket => {
                            const customer = findCustomer(this.props.customers, ticket.customer)
                            const department = findDepartment(this.props.departments, ticket.department)
                            const employeeNames = selectEmpName(this.props.employees, ticket.employees.map(emp => emp.employee))
                            return (
                                <tr key={ticket._id}>
                                    <td>{ticket.code}</td>
                                    <td><Link to={`/customers/${ticket.customer}`}>{customer ? customer.name : ''}</Link></td>
                                    <td>{department ? department.name : ''}</td>
                                    <td> { employeeNames.join(', ')} </td>
                                    <td>{ ticket.priority }</td>
                                    <td> { ticket.message }</td>
                                    <td>
                                        <Link to={`/tickets/edit/${ticket._id}`}>Edit</Link>
                                        <button onClick={() => {
                                            this.handleRemove(ticket._id)
                                        }}>remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
               
                <Link to="/tickets/new">Add Ticket</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments, 
        customers: state.customers, 
        employees: state.employees,
        tickets: state.tickets
    }
}

export default connect(mapStateToProps)(TicketsList)