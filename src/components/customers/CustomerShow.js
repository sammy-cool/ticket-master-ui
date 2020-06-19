import React from 'react'
import { connect } from 'react-redux'
import { startUpdateCustomerEmail } from '../../../actions/customerAction'

class CustomerShow extends React.Component {
    constructor(){
        super()
        this.state = {
            isCustomerEdit: false,
            name: '',
            email:'',
            mobile:''
        }
    }

    showCustomerName = (id) => {
        const customer = this.props.customers.find(customer => customer._id == id)
        return customer.name
    }

    showCustomerEmail = (id) => {
        const customer = this.props.customers.find(customer => customer._id == id)
        return customer.email
    }
    handleEdit = (id) => {        
        
        this.setState(prevState => {
            return {
                isCustomerEdit: !prevState.isCustomerEdit
            }
        })
        
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const customer = this.props.customers.find(cust => cust._id == this.props.match.params.id)
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        console.log(formData)
        this.setState(prevState => {
            return {
                isCustomerEdit: !prevState.isCustomerEdit
            }    
        })
        this.props.dispatch(startUpdateCustomerEmail(customer._id, formData.email))
    }

    render() {

        return (
            <div> 
                
            <p>{this.showCustomerName(this.props.match.params.id) }</p>
            <p>{this.showCustomerEmail(this.props.match.params.id)}</p> <br />
            {
                this.state.isCustomerEdit? 
                (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />

                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />

                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} />

                        <input type="submit" value="Update Customer" />
                    </form>

                ): <button onClick={()=>{this.handleEdit(this.props.match.params.id)}}>edit</button> 
            }

            
            <button>All</button><button>Pending</button><button>Completed</button>
            <br/><hr/>
                
                
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
    
}
export default connect(mapStateToProps)(CustomerShow)