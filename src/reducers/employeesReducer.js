const initialState = []

const employeesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_EMPLOYEES' : {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default employeesReducer