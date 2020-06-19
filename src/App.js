import React from 'react'
import { connect }  from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Home from './components/static/Home'
import Login from './components/auth/user/Login'
import Register from './components/auth/user/Register'
import Dashboard from './components/auth/user/Dashboard'
import Customers from './components/auth/customers/Customers'
import CustomerShow from './components/auth/customers/CustomerShow'
import Departments from './components/auth/departments/Departments'
import DepartmentShow from './components/auth/departments/DepartmentShow'
import Employees from './components/auth/employees/Employees'
import Tickets from './components/auth/tickets/Tickets'
import { startUserLogout } from './actions/userAction'


function App(props) {
    const handleLogout = () => {
        props.dispatch(startUserLogout())
    }
    return (
        <BrowserRouter>
            <div>
                <Link to='/'>Home</Link>|
                <Route path='/' component={Home} exact={true}/>
                {
                    Object.keys(props.user).length != 0? (
                        <div>
                            <Link to='/customers'>Customers</Link>|
                            <Route path='/customers' component={Customers}/>

                            <Link to='/departments'>Departments</Link>|
                            <Route path='/departments' component={Departments}/>

                            <Link to='/employees'>Employees</Link>|
                            <Route path='/employees' component={Employees}/>

                            <Link to='/tickets'>Tickets</Link>|
                            <Route path='/tickets' component={Tickets}/>

                            <Link to='#' onClick={handleLogout}>Logout</Link>
                        </div>
                    ):(
                        <div>
                            <Link to='/register'>Register</Link>|
                            <Route path='/register' component={Register} />

                            <Link to='/login'>Login</Link>
                            <Route path='/login' component={Login}/>
                        </div>
                    )
                }
                
                <Route path='/dashboard' component={Dashboard}/>
                {/* <Route path='/dashboard' component={Home}/> */}
                
                <Route path= '/customerShow/:id' component={CustomerShow} />
                <Route path= '/departmentShow/:id' component={DepartmentShow} />

            </div>
        </BrowserRouter>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
    
}
export default connect(mapStateToProps)(App) 