import React from 'react' 
import { connect } from 'react-redux'

function Dashboard(props) {
    return (
        <div>
            <h1>Dashboard - Stats</h1>
            <h2>Customers - { props.customers.length }</h2>
            <h2>Departments - {props.departments.length}</h2>
            <h2>Employees - {props.employees.length}</h2>
            <h2>Tickets - {props.tickets.length}</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        departments: state.departments,
        employees: state.employees, 
        tickets: state.tickets
    }
}

export default connect(mapStateToProps)(Dashboard)