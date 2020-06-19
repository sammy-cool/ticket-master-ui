import React from 'react'
import { connect } from 'react-redux'
import { startGetAllTickets, startUpdateTicket, startCreateTicket, startDeleteTicket } from '../../../actions/ticketAction'

class Tickets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAddTicket: false,
            code:'',
            selectedCustomer: {},
            selectedDepartment: {},
            employeesInSelectedDepartment: [],
            selectedEmployees: [],
            priority: '',
            message: '',
            ticketId: '',
            ticket: {}
        }
    }

    componentDidMount() {
        this.props.dispatch(startGetAllTickets())

    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleAddTicket = () => {
        this.setState(prevState => {
            return {
                isAddTicket: !prevState.isAddTicket
            }
        })

        
        // // this.props.dispatch(startCreateTicket(formData))
        // this.setState({
        //     code:'',
        //     customer:'',
        //     department:'',
        //     employees: '',
        //     priority: '',
        //     message: ''
        // })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customers,
            department: this.state.department,
            employees: this.state.employees[0]._id,
            priority: this.state.priority,
            message: this.state.message
        }
        console.log(formData)
        this.setState(prevState => {
            return {
                isAddTicket: !prevState.isAddTicket
            }
        })

    }

    handleTicketIdSubmit = (e) => {
        e.preventDefault()
        const ticket = this.props.tickets.find(ticket=>ticket._id == this.state.ticketId) 
        this.setState({ticket})
    }

    handleTicketUpdate = (e) => {
        e.preventDefault()
        this.props.dispatch(startUpdateTicket(this.state.ticketId, this.state.priority))
        this.setState({
            ticketId: '',
            priority: ''
        })
    }

    handleTicketDelete = (e) => {
        e.preventDefault()
        this.props.dispatch(startDeleteTicket(this.state.ticketId))
        this.setState({
            ticketId: ''
        })
    }

    handleSelect = (e) => {
        const selectedEmployees = e.target.value
        this.setState({selectedEmployees})
    }
    handleCustomerSelect = (e) => {
        this.setState({
            selectedCustomer: e.target.value
        })

    }
    handleDepartmentSelect = (e) => {
        this.setState({
            selectedDepartment: e.target.value
        })
        // console.log(e.target.value)
        const employeesInSelectedDepartment = this.props.employees.map(emp => {
            if(emp.department == e.target.value) {
                return emp
            }  
            else {
                return
            }
        }) 
        this.setState({employeesInSelectedDepartment})
    }
    handleEmployeesSelect = (e) => {
        console.log(e.target.value)
    }
  


    render(){
        return (
            <div>
                <h2>Tickets - {this.props.tickets.length}</h2>
                <table border="2">
                    <thead>
                        <tr>
                            <th>Code No</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Remove</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                            { 
                                this.props.tickets.map(ticket=>{
                                    return (
                                    <tr key={ticket._id}>
                                        <td>{ticket.code}</td>
                                        <td>{ticket.customer}</td>
                                        <td>{ticket.department}</td>
                                        <td>{}</td>
                                        <td>{ticket.message}</td>
                                        <td>{ticket.priority}</td>
                                        <td><button>Show</button></td>
                                        <td><button>Remove</button></td>
                                        <td>{ticket.isResolved?'Resolved': 'Not Resolved'}</td>
                                    </tr>
                                    )
                                })
                            }
                    </tbody>
                </table> <br/>
                <hr />
                {
                    this.state.isAddTicket?
                    (<div>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="code">Code</label>
                            <input type="text" id="code" name="code" value={this.state.code} onChange={this.handleChange} /><br/>

                            <label htmlFor="customer">Customer</label>
                            <select id="customer" onChange={this.handleCustomerSelect}>
                                    <option value={this.state.selectedCustomer}>Select</option>
                                    {
                                        this.props.customers.map(function(customer){
                                            return <option value={customer._id}>{customer.name}</option>
                                        })
                                    }
                            </select> <br/>

                            <label htmlFor="department">Department</label>
                            <select id="department" onChange={this.handleDepartmentSelect}>
                                    <option value={this.state.selectedDepartment}>Select</option>
                                    {
                                        this.props.departments.map(function(department){
                                            return <option value={department._id}>{department.name}</option>
                                        })
                                    }
                            </select> <br/>
                            <label htmlFor="employees">Employees</label>
                            <select id="employees" onChange={this.handleEmployeesSelect}>
                                    <option value={this.state.employeesInSelectedDepartment}>Select</option>
                                    {
                                        this.props.employees.map(function(employee){
                                            return <option value={employee._id}>{employee.name}</option>
                                        })
                                    }
                            </select><br/>
                            <label htmlFor="priority">Priority</label>
                            <input type="text" id="priority" name="priority" value={this.state.priority} onChange={this.handleChange} /><br/>

                            <label htmlFor="message">Message</label>
                            <input type="text" id="message" name="message" value={this.state.message} onChange={this.handleChange} /><br/>
                            
                            <input type="submit" value="add ticket" />
                    </form></div>): <button onClick={this.handleAddTicket}>Add Ticket</button>
            }
                
                <hr/>

             

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        customers: state.customers,
        employees: state.employees,
        departments: state.departments,
        tickets: state.tickets
    }
}

export default connect(mapStateToProps)(Tickets)