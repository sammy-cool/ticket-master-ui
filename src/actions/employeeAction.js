import axios from '../config/axios'

export const setEmployee = (employee) => {
    return {type: 'SET_EMPLOYEE', payload: employee}
}

export const setAllEmployees = (employees) => {
    return {type: 'SET_ALL_EMPLOYEES', payload: employees}
}

export const updateEmployee = (updatedEmployee) => {
    return {type: 'UPDATE_EMPLOYEE', payload: updatedEmployee}
}

export const deleteEmployee = (deletedEmployee) => {
    return {type: 'DELETE_EMPLOYEE', payload: deletedEmployee}
}

export const startGetAllEmployees = () => {
    return (dispatch) => {
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=> {
                console.log(response.data)
                dispatch(setAllEmployees(response.data))
            })

    }
}

export const startUpdateEmployeeName = (id, name) => {
    return (dispatch) => {
        axios.put(`/employees/${id}`, {name}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(updateEmployee(response.data))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}


export const startCreateEmployee = (formData) => {
    console.log(formData)
        return (dispatch)=> {
            axios.post('/employees', formData, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(response=>{
                    
                    dispatch(setEmployee(response.data))
                })
                .catch(err=>{
                    alert(err)
                })
        }
}

export const startDeleteEmployee = (id) => {
    return (dispatch)=>{
        axios.delete(`/employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(deleteEmployee(response.data))
            })
    }
}

