import axios from '../config/axios'

export const setCustomers = (customers) => {
    return { type: 'SET_CUSTOMERS', payload: customers}
}

export const startGetCustomers = () => {
    return (dispatch) => {
        axios.get('/customers', {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const customers = response.data 
            dispatch(setCustomers(customers))
        })
    }
}