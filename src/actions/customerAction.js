import axios from '../config/axios'

export const setCustomer = (customer) => {
    return {type: 'SET_CUSTOMER', payload: customer}
}

export const setAllCustomers = (customers) => {
    return {type: 'SET_ALL_CUSTOMERS', payload: customers}
}

export const updateCustomer = (updatedCustomer) => {
    return {type: 'UPDATE_CUSTOMER', payload: updatedCustomer}
}

export const deleteCustomer = (deletedCustomer) => {
    return {type: 'DELETE_CUSTOMER', payload: deletedCustomer}
}

export const startGetAllCustomers = () => {
    return (dispatch) => {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=> {
                console.log(response.data)
                dispatch(setAllCustomers(response.data))
            })

    }
}

export const startUpdateCustomerEmail = (id, email) => {
    return (dispatch) => {
        axios.put(`/customers/${id}`, {email}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                 dispatch(updateCustomer(response.data))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}


export const startCreateCustomer = (formData) => {
    console.log(formData)
        return (dispatch)=> {
            axios.post('/customers', formData, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(response=>{
                    dispatch(setCustomer(response.data))
                })
                .catch(err=>{
                    alert(err)
                })
        }
}

export const startDeleteCustomer = (id) => {
    return (dispatch)=>{
        axios.delete(`/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(deleteCustomer(response.data))
            })
    }
}

