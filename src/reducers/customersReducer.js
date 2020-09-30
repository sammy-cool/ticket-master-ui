const customersInitialState = []
const customersReducer = (state = customersInitialState, action) => {
    switch(action.type) {
        case 'SET_CUSTOMERS' : {
            return [...action.payload] // [].concat(action.payload)
        }
        case 'EDIT_CUSTOMER' : {
            
        }
        default: {
            return [...state]
        }
    }
}

export default customersReducer