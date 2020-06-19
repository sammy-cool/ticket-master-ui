const employeeInitialState = []
const employeeReducer = (state = employeeInitialState, action) => {
    switch(action.type) {
        case 'SET_EMPLOYEE' : {
            return state.concat(action.payload)
        }
        case 'SET_ALL_EMPLOYEES' : {
            return [].concat(action.payload)
        }
        case 'UPDATE_EMPLOYEE' : {
            for(let i = 0 ; i < state.length; i++) {
                if(state[i]._id == action.payload._id) {
                    state[i].name = action.payload.name
                }
            }
            return state
         }
         case 'DELETE_EMPLOYEE' : {
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
export default employeeReducer