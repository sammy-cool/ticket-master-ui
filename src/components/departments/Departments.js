import React from 'react'
import { connect } from 'react-redux'

import { startCreateDept, startGetAllDepartments, startUpdateDept, startDeleteDept  } from '../../../actions/departmentAction'

class Departments extends React.Component {
    constructor() {
        super()
        this.state = {
            deptName: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(startGetAllDepartments())
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSumbit = (e) => {
        e.preventDefault()
        this.props.dispatch(startCreateDept(this.state.deptName))
        this.setState({
            deptName: ''
        })

    }
    
    handleDeptRemove = (deptId) => {
        
        this.props.dispatch(startDeleteDept(deptId))
    }

    handleDeptShow = (deptId) => {
        const department = this.props.departments.find(department => {
            return department._id == deptId
        })
        this.props.history.push(`/departmentShow/${department._id}`) 
    }

    render(){
        return (
            <div>
                <h2>Departments - {this.props.departments.length}</h2>

                <table border="1">
                    
                    <tbody>
                        {
                            this.props.departments.map(department => {
                                return (
                                <tr key={department._id}>
                                    
                                    <td>{department.name}</td>
                                    <td><button onClick={()=>{this.handleDeptShow(department._id)}}>Show</button></td>
                                    <td><button onClick={()=>{this.handleDeptRemove(department._id)}}>Remove</button></td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <br/>
                <hr/>


                <form onSubmit={this.handleSumbit}>
                    
                    <label htmlFor="deptName">Name</label> <br/>
                    <input type="text" id="deptName" name="deptName" value={this.state.deptName} onChange={this.handleChange}/><br/>

                    <input type="submit" value="Add Department" />
                </form>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        departments: state.departments
    }
}
export default connect(mapStateToProps)(Departments)