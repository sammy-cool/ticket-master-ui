import React from 'react'
import { connect } from 'react-redux'

import { startCreateCustomer, startGetAllCustomers, startUpdateCustomerEmail, startDeleteCustomer  } from '../../../actions/customerAction'
import AddCustomer from './AddCustomer'

class Customers extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAdd: false,
        }
    }
    componentDidMount() {
        this.props.dispatch(startGetAllCustomers())
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
            mobile: this.state.mobile
        }
        this.props.dispatch(startCreateCustomer(formData))
        this.setState({
            name:'',
            email:'',
            mobile:''
        })
    }

    handleCustomerIdSubmit = (e) => {
        e.preventDefault()
        const customer = this.props.customers.find(customer=>customer._id == this.state.customerId) 
        this.setState({customer})
    }

    handleCustomerUpdate = (e) => {
        e.preventDefault()
        this.props.dispatch(startUpdateCustomerEmail(this.state.customerId, this.state.customerEmail))
        this.setState({
            customerId: '',
            customerEmail: ''
        })
    }

    
    handleAddCustomer = (e) => {
        this.setState(prevState=>{
            return {
                isAdd: !prevState.isAdd
            }
        })
    }
    customerId = (length) => {
        
        return (length - (length -1 )) + 1
    }
    handleCustomerShow = (id) => {
        const customer = this.props.customers.find(customer => {
            return customer._id == id
        })
        this.props.history.push(`/customerShow/${customer._id}`)           
    }

    handleCustomerDelete = (id) => {
        this.props.dispatch(startDeleteCustomer(id))    
    }
  

    render(){
        return (
            <div>
                <h2>Customers</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                            { 
                                this.props.customers.map(customer=>{
                                    return (
                                    <tr key={customer._id}>
                                        <td>{this.customerId(this.props.customers.length)}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        <td><button onClick={()=> {this.handleCustomerShow(customer._id)}}>show</button></td>
                                        <td><button onClick={()=>{this.handleCustomerDelete(customer._id)}}>remove</button></td>
                                    </tr>
                                    )
                                })
                            }
                    </tbody>
                </table> <br/>
                
                {(this.state.isAdd)? <AddCustomer isAdd={this.state.isAdd} /> : <button onClick={this.handleAddCustomer}>Add Customer</button>  }
              
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        customers: state.customers
    }
}

export default connect(mapStateToProps)(Customers)