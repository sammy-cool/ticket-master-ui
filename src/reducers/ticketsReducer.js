const initialState = []

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TICKETS': {
            return [...action.payload]
        }
        case 'ADD_TICKET' : {
            // return state.concat(action.payload)
            return [...state, action.payload]
        }
        case 'REMOVE_TICKET' : {
            return state.filter(ticket => ticket._id !== action.payload)
        }
        case 'EDIT_TICKET' : {
            return state.map(ticket => {
                if(ticket._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return {...ticket }
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default ticketsReducer