const customernitialState = []

const customerReducer = (state = customernitialState, action) => {
    switch(action.type) {
        case 'SET_CUSTOMER' : {
            return state.concat(action.payload)
        }
        case 'SET_ALL_CUSTOMERS': {
            return [].concat(action.payload)
        }
        case 'UPDATE_CUSTOMER' : {
            for(let i = 0 ; i < state.length; i++) {
                if(state[i]._id == action.payload._id) {
                    state[i].email = action.payload.email
                }
            }
            return state
         }
         case 'DELETE_CUSTOMER' : {
            for(let i = 0 ; i < state.length; i++) {
                if(state[i]._id == action.payload._id) {
                    state.splice(i,1)
                }
            }
            return state
         }

        default: {
            return state
        }
    }
}
export default customerReducer