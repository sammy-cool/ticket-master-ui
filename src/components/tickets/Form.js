import React from 'react' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectEmployeesByDepartment } from '../../selectors/employeesSelector'
// import { findTicket } from '../../selectors/ticketsSelector'
import { startAddTicket, startEditTicket } from '../../actions/ticketsAction'

class TicketForm extends React.Component {
    constructor(props){ 
        console.log('constructor', props)
        super(props)
        this.state = {
            code: props.ticket ? props.ticket.code : '',
            customer: props.ticket ? props.ticket.customer :  '',
            department: props.ticket ? props.ticket.department :  '',
            employees: props.ticket ? props.ticket.employees :  [],
            priority: props.ticket ? props.ticket.priority :  '',
            message: props.ticket ? props.ticket.message : '',
            priorities: ['high','medium','low']
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const { code, customer, department, employees, priority, message} = this.state 
        const formData = { code, customer, department, priority, message }
        formData.employees = employees.map(emp => ({ employee: emp }))
        
        const redirect = () => {
            return this.props.history.push('/tickets')
        }

        if(this.props.ticket) {
            this.props.dispatch(startEditTicket(this.props.ticket._id, formData, redirect))
        } else {
            this.props.dispatch(startAddTicket(formData, redirect))
        }
        

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDepartmentChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            employees: []
        })
    }

    handleEmployeeSelection = (e) => {
        const id = e.target.value 
        if(!this.state.employees.includes(id)) {
            this.setState((prevState) => {
                return {
                    employees: prevState.employees.concat(id)
                }
            })
        }
    }   

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="code">Code</label>
                    <input type="text" 
                        value={this.state.code} 
                        onChange={this.handleChange} 
                        name="code"
                        id="code"
                    /> <br/>

                    <label htmlFor="customer">Customer</label>
                    <select value={this.state.customer} onChange={this.handleChange} name="customer">
                        <option value="">select</option>
                        { this.props.customers.map((customer) => {
                            return <option value={customer._id} key={customer._id}>{customer.name}</option>
                        })}
                    </select> <br/>


                    <label htmlFor="department">Department</label>
                    <select value={this.state.department} onChange={this.handleDepartmentChange} name="department">
                        <option value="">select</option>
                        {this.props.departments.map((department) => {
                            return <option value={department._id} key={department._id}>{department.name}</option>
                        })}
                    </select> <br />

                    <label htmlFor="employees">Employees</label>
                    <select value={this.state.employees} onChange={this.handleEmployeeSelection} name="employees" multiple={true}>
                        <option value="">select</option>
                        {selectEmployeesByDepartment(this.props.employees, this.state.department).map((employees) => {
                            return <option value={employees._id} key={employees._id}>{employees.name}</option>
                        })}
                    </select> <br />

                    <label>Priority</label>
                    
                    {
                        this.state.priorities.map((priorityMsg) => {
                            return ( 
                                <React.Fragment key={priorityMsg}>
                                    <input type="radio" value={priorityMsg} id={priorityMsg} onChange={this.handleChange} name="priority" checked={this.state.priority === priorityMsg} /> 
                                    <label htmlFor={priorityMsg}>{priorityMsg}</label>
                                </React.Fragment>
                            )
                        })
                    } <br/>

                    <label htmlFor="message">Message</label>
                    <textarea value={this.state.message} onChange={this.handleChange} name="message" id="message"></textarea> <br/>

                    <input type="submit" />
                
                </form>
            </div>  
        )
    }
}

const mapStateToProps = (state, props) => {
    // const id = props.match.params.id 
    return { 
        customers: state.customers,
        departments: state.departments,
        employees: state.employees,
        // ticket: findTicket(state.tickets, id)
    }
}

export default withRouter(connect(mapStateToProps)(TicketForm))
