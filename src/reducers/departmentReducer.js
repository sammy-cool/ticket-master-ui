const departmentInitialState = []

const departmentReducer = (state = departmentInitialState, action) => {
    switch(action.type) {
        case 'SET_DEPT' : {
            return state.concat(action.payload)
        }
        case 'SET_ALL_DEPTS' : {
            return [].concat(action.payload)
        }
        case 'UPDATE_DEPT' : {
            for(let i = 0 ; i < state.length; i++) {
                if(state[i]._id == action.payload._id) {
                    state[i].name = action.payload.name
                }
            }
            return state
         }
         case 'DELETE_DEPT' : {
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
export default departmentReducer