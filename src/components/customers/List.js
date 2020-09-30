import React from 'react' 
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetCustomers } from '../../actions/customersAction'

class CustomersList extends React.Component {

    componentDidMount() {
        if(this.props.customers.length == 0) {
            this.props.dispatch(startGetCustomers())
        }
    }

    render() {
        return (
            <div> 
                <h2>Listing Customers - { this.props.customers.length } </h2>
                <ul>
                    { this.props.customers.map(customer => {
                        return <li key={customer._id}>
                            <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
                        </li>
                    })}
                </ul>


                <Link to="/customers/new">Add Customer</Link>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

const EnhancedComponent = connect(mapStateToProps)(CustomersList)

export default EnhancedComponent

/*
    function connect(mstp) {
        return (WrappedComponent) => {
            return () => {
                return <WrappedComponent />
                }
            }
        }
    }
*/