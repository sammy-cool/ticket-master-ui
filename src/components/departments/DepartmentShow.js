import React from 'react'
import { connect } from 'react-redux'
import { startUpdateDept } from '../../../actions/departmentAction'

class DepartmentShow extends React.Component {
    showDepartmentName = (id) => {
        const department = this.props.departments.find(department => department._id == id)
        return department.name
    }

    handleEdit = (id) => {
        const department = this.props.departments.find(department => department._id == id)
        this.props.dispatch(startUpdateDept(department._id, department.name))
    }

    render() {
        return (
            <div>   
                <p>{this.showDepartmentName(this.props.match.params.id) }</p>
                <button onClick={()=>{this.handleEdit(this.props.match.params.id)}}>edit</button><br/><br/><br/><br/>
                <button>All</button><button>Pending</button><button>Completed</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        departments: state.departments
    }
    
}
export default connect(mapStateToProps)(DepartmentShow)