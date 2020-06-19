import axios from '../config/axios'

export const setDepartment = (dept) => {
    return {type: 'SET_DEPT', payload: dept }
}

export const startCreateDept = (deptName) => {
    return (dispatch) => {
        axios.post('/departments', {name: deptName}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log(response.data)
                dispatch(setDepartment(response.data))

            })
            .catch(err=>{
                console.log(err.message)
            })
    }
}

export const setAllDepartments = (depts) => {
    return {type: 'SET_ALL_DEPTS', payload: depts }
}


export const startGetAllDepartments = () => {
    return (dispatch) => {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                dispatch(setAllDepartments(response.data))
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}



export const updateDept = (updatedDept) => {
    return {type: 'UPDATE_DEPT', payload: updatedDept}
}

export const startUpdateDept = (id, name) => {
    return (dispatch) => {
        axios.put(`/departments/${id}`, {name}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(updateDept(response.data))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}

export const deleteDept = (deletedDept) => {
    return {type: 'DELETE_DEPT', payload: deletedDept}
}

export const startDeleteDept = (id) => {
    return (dispatch)=>{
        axios.delete(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log(response.data)
                dispatch(deleteDept(response.data))
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}
