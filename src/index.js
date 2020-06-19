import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import configureStore  from './store/configureStore'
import { startGetAllCustomers } from './actions/customerAction'
import { startLoginUser } from './actions/userAction'

const store = configureStore()
console.log(store.getState())
store.subscribe(()=>{
    console.log(store.getState())
})

// // Page Reloads
if(localStorage.getItem('authToken')) {
        store.dispatch(startGetAllCustomers())
 }

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'))
