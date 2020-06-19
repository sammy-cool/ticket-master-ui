import React from 'react'
import {connect} from 'react-redux'

import {startCreateCustomer} from '../../../actions/customerAction'

class CustomerAdd extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAdd: this.props.isAdd,
            name: '',
            email: '',
            mobile: ''
        }
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
        console.log(formData)
        this.props.dispatch(startCreateCustomer(formData))
        this.setState(prevState=>{
            return {
                isAdd: !prevState.isAdd,
                name: '',
                email: '',
                mobile: ''
            }
        })
    }
    handleClick = () => {
        this.setState(prevState=>{
            return {
                isAdd: !prevState.isAdd
            }
        })
    }

   
    render() {
        return (
            <div>
                {this.state.isAdd? <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} /><br/>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} /><br/>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} /><br/>
                    <input type="submit" value="add" />
                </form> : <button onClick={this.handleClick}>Add Customer</button>}
                 
            </div>
        )
        
    }
}
export default connect()(CustomerAdd)