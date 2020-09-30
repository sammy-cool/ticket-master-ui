import axios from '../config/axios'

export const setDepartments = (departments) => {
    return { type: 'SET_DEPARTMENTS', payload: departments}
}

export const startGetDepartments = () => {
    return (dispatch) => {
        axios.get('/departments', {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const departments = response.data 
            dispatch(setDepartments(departments))
        })
    }
}