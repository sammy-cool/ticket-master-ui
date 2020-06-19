import React from 'react'
import { connect } from 'react-redux'
import { startGetAllEmployees, startCreateEmployee, startUpdateEmployeeName, startDeleteEmployee } from '../../../actions/employeeAction'

class Employees extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isAdd: false,
            name: '',
            email: '',
            mobile: '',
            departments: this.props.departments,
            selectedDepartment: {},
            selectedDepartmentId: ''
            
        }
    }
    componentDidMount() {
        this.props.dispatch(startGetAllEmployees())
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.selectedDepartmentId
        }
        this.props.dispatch(startCreateEmployee(formData))
        this.setState(prevState => {
            return {
                isAdd: !prevState.isAdd,
                name: '',
                email: '',
                mobile: ''
            }
            
        })

    }

    handleEmployeeIdSubmit = (e) => {
        e.preventDefault()
        const employee = this.props.employees.find(employee=>employee._id == this.state.employeeId) 
        this.setState({employee})
    }

    handleEmployeeUpdate = (e) => {
        e.preventDefault()
        this.props.dispatch(startUpdateEmployeeName(this.state.employeeId, this.state.employeeName))
        this.setState({
            employeeId: '',
            employeeName: ''
        })
    }

    handleEmployeeDelete = (empId) => {
        this.props.dispatch(startDeleteEmployee(empId))

    }
    handleAddEmployee = () => {
        this.setState(prevState => {
            return {
                isAdd: !prevState.isAdd
            }
        })
    }
    handleSelectDepartment = (e) => {
        const selectedDepartmentId = e.target.value
        const selectedDepartment = this.props.departments.find(dept=>dept._id==selectedDepartmentId)
        this.setState({
            selectedDepartment: selectedDepartment,
            selectedDepartmentId: selectedDepartmentId
        })

    }
    findDept = (deptId) => {
        const department = this.props.departments.find(dept => dept._id == deptId)
        return department.name
    }
  
    render(){
        return (
            <div>
                <h2>Employees-{this.props.employees.length}</h2>
                <table border="2">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                            <th>Remove</th>

                        </tr>
                    </thead>
                    <tbody>
                            { 
                                this.props.employees.map(employee=>{
                                    return (
                                    <tr key={employee._id}>
                                        <td>{1}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>
                                            {
                                                this.findDept(employee.department)
                                            }
                                        </td>
                                        <td><button>Show</button></td>
                                        <td><button onClick={()=>{this.handleEmployeeDelete(employee._id)}}>Remove</button></td>
                                    </tr>
                                    )
                                })
                            }
                    </tbody>
                </table> <br/>
                <hr />
                {this.state.isAdd? <button onClick={this.handleAddEmployee}>Add Employee</button>: (
                    <div>
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /><br/>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} /><br/>
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} /><br/>
                        <label htmlFor="department">Department</label>
                        <select onChange={this.handleSelectDepartment}>
                            <option value={this.state.selectedDepartment}>Select Department</option>
                            {
                                this.state.departments.map(department => {
                                    return <option key = {department._id} value={department._id}>{department.name}</option>
                                })
                            }
                        </select>
                        
                        <input type="submit" />
                </form>
                    </div>
                )}
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        employees: state.employees,
        departments: state.departments,
        
    }
}

export default connect(mapStateToProps)(Employees)