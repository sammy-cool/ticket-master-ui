import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { Provider } from 'react-redux'  //Provider component will make the redux store available to the rest of our appln


import configureStore from './store/configureStore'
import { startGetUser } from './actions/userAction'

 const store = configureStore()
 console.log(store.getState())

 store.subscribe(() => {
     console.log(store.getState())
 })

 // handle page reload
 if(localStorage.getItem('authToken')) {
     store.dispatch(startGetUser())
 }

 const jsx = (
     <Provider store={store}>
         <App />
     </Provider>
 )

ReactDOM.render(jsx, document.getElementById('root'))