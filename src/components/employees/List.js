import React from 'react'
import { connect } from 'react-redux'
import { startGetEmployees } from '../../actions/employeesAction'

class EmployeesList extends React.Component {

    componentDidMount() {
        this.props.dispatch(startGetEmployees())
    }

    render() {
        return (
            <div>
                <h2>Listing employees - {this.props.employees.length}</h2>
                <ul>
                    {this.props.employees.map(employee => {
                        return <li key={employee._id}>{employee.name} </li>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeesList)