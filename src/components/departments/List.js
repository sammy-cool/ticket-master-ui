import React from 'react' 
import { connect } from 'react-redux'
import { startGetDepartments } from '../../actions/departmentsAction'
import { filterByDept } from '../../selectors/ticketsSelector'

class DepartmentsList extends React.Component {

    componentDidMount() {
        // if(this.props.departments.length == 0) {
            this.props.dispatch(startGetDepartments())
        // }
    }

    render() {
        return (
            <div>
                <h2>Listing Departments - { this.props.departments.length }</h2>
                <ul>
                    { this.props.departments.map(department => {
                        const tickets = filterByDept(this.props.tickets, department._id)
                        return <li key={department._id}>{ department.name} - { tickets.length }</li>
                    })}
                </ul>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments,
        tickets: state.tickets
    }
}

export default connect(mapStateToProps)(DepartmentsList)