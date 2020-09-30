import axios from '../config/axios'
export const setTickets = (tickets) => {
    return { type: 'SET_TICKETS', payload: tickets }
}

export const startGetTickets = () => {
    return (dispatch) => {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const tickets = response.data
                dispatch(setTickets(tickets))
            })
    }
}

export const addTicket = (ticket) => {
    return { type: 'ADD_TICKET', payload: ticket }
}

export const startAddTicket = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/tickets', formData, {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const ticket = response.data 
            dispatch(addTicket(ticket))
            redirect()
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}


export const removeTicket = (id) => {
    return { type: 'REMOVE_TICKET', payload: id }
}

export const startRemoveTicket = (id) => {
    return (dispatch) => {
        axios.delete(`/tickets/${id}`, {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const ticket = response.data 
            dispatch(removeTicket(ticket._id))
        })
        .catch((err) =>{ 
            alert(err.message)
        })
    }
}


export const editTicket = (ticket) => {
    return { type: 'EDIT_TICKET', payload: ticket }
}

export const startEditTicket = (id, formData, redirect) => {
    return (dispatch) => {
        axios.put(`/tickets/${id}`, formData, {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const ticket = response.data 
            dispatch(editTicket(ticket))
            redirect()
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}