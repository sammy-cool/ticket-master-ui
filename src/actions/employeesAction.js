import axios from '../config/axios'
export const setEmployees = (employees) => {
    return { type: 'SET_EMPLOYEES', payload: employees}
}

export const startGetEmployees = () => {
    return (dispatch) => {
        axios.get('/employees', {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const employees = response.data 
            dispatch(setEmployees(employees))
        })
    }
}